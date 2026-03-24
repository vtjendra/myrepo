import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendComplaintEmail } from '@/lib/email/resend';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`send-case:${ip}`, 3, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch case with company entity
  const { data: caseData, error: caseError } = await supabase
    .from('cases')
    .select(`
      *,
      company_entity:company_entities (
        complaint_email,
        local_name,
        company:companies (canonical_name)
      )
    `)
    .eq('id', uuid)
    .eq('user_id', user.id)
    .single();

  if (caseError || !caseData) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }

  const entity = caseData.company_entity as unknown as {
    complaint_email: string | null;
    local_name: string;
    company: { canonical_name: string };
  };

  if (!entity.complaint_email) {
    // No email available — mark as ready_to_send and return instructions
    return NextResponse.json({
      sent: false,
      message: 'No complaint email available for this company. Please send manually.',
    });
  }

  // Fetch user details
  const { data: userData } = await supabase
    .from('users')
    .select('full_name, email')
    .eq('id', user.id)
    .single();

  const userName = userData?.full_name || userData?.email || user.email || 'Consumer';
  const userEmail = user.email || '';

  // Send email via Resend
  const result = await sendComplaintEmail({
    to: entity.complaint_email,
    companyName: entity.local_name || entity.company.canonical_name,
    complaintText: caseData.final_complaint,
    userName,
    userEmail,
    caseId: uuid,
  });

  if (result.error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  // Update case status
  await supabase
    .from('cases')
    .update({ status: 'sent', sent_at: new Date().toISOString() })
    .eq('id', uuid);

  return NextResponse.json({ sent: true });
}
