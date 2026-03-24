import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCaseSchema } from '@/lib/validators/case';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`create-case:${ip}`, 5, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createCaseSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;

  const { data: newCase, error } = await supabase
    .from('cases')
    .insert({
      user_id: user.id,
      company_entity_id: data.companyEntityId,
      issue_category: data.issueCategory,
      issue_subcategory: data.issueSubcategory,
      what_happened: data.whatHappened,
      when_occurred: data.whenOccurred,
      amount_involved: data.amountInvolved,
      currency_code: data.currencyCode,
      desired_outcome: data.desiredOutcome,
      draft_complaint: data.draftComplaint,
      final_complaint: data.finalComplaint,
      is_public: data.isPublic,
      evidence_urls: data.evidenceUrls,
      status: 'ready_to_send',
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }

  return NextResponse.json({ id: newCase.id }, { status: 201 });
}
