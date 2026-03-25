import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`feed:${ip}`, 30, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort') || 'recent'; // 'recent' | 'active'
  const companyEntityId = searchParams.get('company_entity_id');
  const cursor = searchParams.get('cursor'); // ISO timestamp for pagination
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 50);

  const supabase = await createClient();

  let query = supabase
    .from('cases')
    .select(`
      id, issue_category, issue_subcategory, what_happened, status,
      is_public, upvote_count, created_at, updated_at,
      company_entity:company_entities (
        id, local_name, country_code,
        company:companies (canonical_name, global_slug, industry, logo_url)
      )
    `)
    .eq('is_public', true)
    .neq('status', 'drafting')
    .limit(limit);

  if (companyEntityId) {
    query = query.eq('company_entity_id', companyEntityId);
  }

  if (sort === 'active') {
    query = query.order('upvote_count', { ascending: false }).order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }

  const nextCursor = data.length === limit ? data[data.length - 1].created_at : null;

  // Batch-fetch upvote status for authenticated users (avoids N+1 per-card fetches)
  let userUpvotedIds: string[] = [];
  const { data: { user } } = await supabase.auth.getUser();
  if (user && data.length > 0) {
    const caseIds = data.map((c) => c.id);
    const { data: upvotes } = await supabase
      .from('case_upvotes')
      .select('case_id')
      .eq('user_id', user.id)
      .in('case_id', caseIds);
    userUpvotedIds = (upvotes || []).map((u) => u.case_id);
  }

  return NextResponse.json(
    { cases: data, nextCursor, userUpvotedIds },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    },
  );
}
