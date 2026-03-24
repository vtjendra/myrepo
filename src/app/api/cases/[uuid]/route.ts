import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: caseData, error } = await supabase
    .from('cases')
    .select(`
      *,
      company_entity:company_entities (
        id, local_name, country_code, complaint_email, complaint_url,
        company:companies (id, canonical_name, global_slug, industry, logo_url)
      ),
      responses (id, sender_type, content, created_at)
    `)
    .eq('id', uuid)
    .eq('user_id', user.id)
    .single();

  if (error || !caseData) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }

  return NextResponse.json(caseData);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Whitelist allowed fields to prevent mass assignment
  const allowedFields = ['final_complaint', 'desired_outcome', 'status'] as const;
  const sanitized: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in body) {
      sanitized[key] = body[key];
    }
  }

  if (Object.keys(sanitized).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('cases')
    .update(sanitized)
    .eq('id', uuid)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }

  return NextResponse.json(data);
}
