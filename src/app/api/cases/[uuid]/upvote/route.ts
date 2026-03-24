import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`upvote:${ip}`, 30, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify case is public
  const { data: caseData } = await supabase
    .from('cases')
    .select('id, is_public')
    .eq('id', uuid)
    .single();

  if (!caseData || !caseData.is_public) {
    return NextResponse.json({ error: 'Case not found or not public' }, { status: 404 });
  }

  // Toggle upvote
  const { data: existing } = await supabase
    .from('case_upvotes')
    .select('id')
    .eq('case_id', uuid)
    .eq('user_id', user.id)
    .single();

  if (existing) {
    // Remove upvote
    await supabase.from('case_upvotes').delete().eq('id', existing.id);
    return NextResponse.json({ upvoted: false });
  } else {
    // Add upvote
    const { error } = await supabase.from('case_upvotes').insert({
      case_id: uuid,
      user_id: user.id,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to upvote' }, { status: 500 });
    }

    return NextResponse.json({ upvoted: true });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  let userUpvoted = false;
  if (user) {
    const { data } = await supabase
      .from('case_upvotes')
      .select('id')
      .eq('case_id', uuid)
      .eq('user_id', user.id)
      .single();
    userUpvoted = !!data;
  }

  const { data: caseData } = await supabase
    .from('cases')
    .select('upvote_count')
    .eq('id', uuid)
    .single();

  return NextResponse.json({
    upvoteCount: caseData?.upvote_count || 0,
    userUpvoted,
  });
}
