import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendReplyNotification } from '@/lib/email/resend';

// Resend inbound email webhook.
//
// Setup in Resend dashboard:
//   Domain:   reply.claimit.id  (or REPLY_EMAIL_DOMAIN)
//   Webhook:  https://claimit.id/api/webhooks/email
//
// When a company hits "Reply" on a complaint email, Resend routes it here.
// We parse the case ID from the To address (case+<uuid>@reply.claimit.id),
// insert a company response, advance the case status, and notify the user.
//
// Webhook secret: set RESEND_WEBHOOK_SECRET in your env and configure the
// same value in the Resend dashboard under "Signing secret" for this endpoint.

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

// Parse the case UUID out of an address like "case+<uuid>@reply.claimit.id"
function parseCaseId(toAddress: string): string | null {
  const match = toAddress.match(/case\+([a-f0-9-]{36})@/i);
  return match?.[1] ?? null;
}

// Strip quoted-reply boilerplate (lines starting with ">") and trim
function extractReplyText(text: string): string {
  return text
    .split('\n')
    .filter((line) => !line.startsWith('>'))
    .join('\n')
    .trim();
}

export async function POST(request: NextRequest) {
  // Verify the shared secret passed as a query param
  // Configure your Resend webhook URL as:
  //   https://claimit.id/api/webhooks/email?secret=<RESEND_WEBHOOK_SECRET>
  if (WEBHOOK_SECRET) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Resend inbound email payload shape
  const data = (payload as { type?: string; data?: Record<string, unknown> })?.data;
  if (!data) {
    return NextResponse.json({ error: 'Unrecognised payload' }, { status: 400 });
  }

  const toAddresses: string[] = Array.isArray(data.to)
    ? (data.to as string[])
    : [String(data.to ?? '')];

  const fromAddress = String(data.from ?? '');
  const subject = String(data.subject ?? '');
  const bodyText = String(data.text ?? data.html ?? '');

  // Find the case+<uuid> address among all To recipients
  let caseId: string | null = null;
  for (const addr of toAddresses) {
    caseId = parseCaseId(addr);
    if (caseId) break;
  }

  if (!caseId) {
    // Not a case reply — ignore gracefully
    return NextResponse.json({ ok: true, ignored: true });
  }

  const replyText = extractReplyText(bodyText);
  if (!replyText) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const admin = createAdminClient();

  // Confirm the case exists and get user info for the notification
  const { data: caseRow, error: caseError } = await admin
    .from('cases')
    .select(`
      id,
      status,
      user_id,
      users ( email, full_name ),
      company_entity:company_entities (
        local_name,
        company:companies ( canonical_name )
      )
    `)
    .eq('id', caseId)
    .single();

  if (caseError || !caseRow) {
    // Unknown case ID — ignore
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Insert a company response on the case timeline
  const { error: insertError } = await admin
    .from('responses')
    .insert({
      case_id: caseId,
      sender_type: 'company',
      content: replyText,
    });

  if (insertError) {
    console.error('Failed to insert company response', insertError);
    return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
  }

  // Advance case status: sent → acknowledged, acknowledged → in_progress
  const currentStatus = caseRow.status as string;
  const nextStatus =
    currentStatus === 'sent' ? 'acknowledged'
    : currentStatus === 'acknowledged' ? 'in_progress'
    : null;

  if (nextStatus) {
    await admin
      .from('cases')
      .update({ status: nextStatus })
      .eq('id', caseId);
  }

  // Notify the user by email
  const user = caseRow.users as { email: string; full_name: string | null } | null;
  const entity = caseRow.company_entity as {
    local_name: string;
    company: { canonical_name: string };
  } | null;

  const companyName = entity?.local_name || entity?.company?.canonical_name || fromAddress;

  if (user?.email) {
    await sendReplyNotification({
      userEmail: user.email,
      userName: user.full_name || user.email,
      companyName,
      replyText,
      caseId,
    }).catch((err) => {
      // Non-fatal — log and continue
      console.error('Failed to send reply notification email', err);
    });
  }

  return NextResponse.json({ ok: true, caseId, status: nextStatus ?? currentStatus });
}
