import 'server-only';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// The domain used for case-specific reply-to addresses.
// Inbound emails to this domain are forwarded to /api/webhooks/email by Resend.
const REPLY_DOMAIN = process.env.REPLY_EMAIL_DOMAIN ?? 'reply.claimit.id';

// Returns the reply-to address for a given case.
// When the company hits "Reply", their response lands at this address,
// which Resend routes to our inbound webhook.
export function getCaseReplyAddress(caseId: string): string {
  return `case+${caseId}@${REPLY_DOMAIN}`;
}

export async function sendComplaintEmail(params: {
  to: string;
  companyName: string;
  complaintText: string;
  userName: string;
  userEmail: string;
  caseId: string;
}) {
  const resend = getResendClient();

  const { to, companyName, complaintText, userName, userEmail, caseId } = params;
  const replyTo = getCaseReplyAddress(caseId);

  const result = await resend.emails.send({
    from: 'ClaimIt <complaints@claimit.id>',
    to: [to],
    replyTo,
    subject: `Consumer Complaint - Case #${caseId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px;">Consumer Complaint via ClaimIt</h1>
        </div>
        <div style="padding: 24px; background: #f9fafb;">
          <p style="color: #374151; white-space: pre-wrap; line-height: 1.6;">${complaintText}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            <strong>From:</strong> ${userName} (${userEmail})<br/>
            <strong>Case Reference:</strong> ${caseId.slice(0, 8).toUpperCase()}<br/>
            <strong>Sent via:</strong> <a href="https://claimit.id">ClaimIt</a>
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            This complaint was submitted through ClaimIt, a consumer rights platform.
            Please reply to this email — your response will be recorded on the case
            and the consumer will be notified.
          </p>
        </div>
      </div>
    `,
  });

  return result;
}

// Sent to the user when the company replies to their complaint.
export async function sendReplyNotification(params: {
  userEmail: string;
  userName: string;
  companyName: string;
  replyText: string;
  caseId: string;
}) {
  const resend = getResendClient();

  const { userEmail, userName, companyName, replyText, caseId } = params;
  const caseUrl = `https://claimit.id/en/cases/${caseId}`;
  const caseRef = caseId.slice(0, 8).toUpperCase();

  const result = await resend.emails.send({
    from: 'ClaimIt <notifications@claimit.id>',
    to: [userEmail],
    subject: `${companyName} replied to your complaint — Case #${caseRef}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px;">Company Response Received</h1>
        </div>
        <div style="padding: 24px; background: #f9fafb;">
          <p style="color: #374151; margin-bottom: 16px;">
            Hi ${userName}, <strong>${companyName}</strong> has responded to your complaint (Case #${caseRef}).
          </p>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #374151; white-space: pre-wrap; line-height: 1.6; margin: 0;">${replyText}</p>
          </div>
          <a href="${caseUrl}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            View Your Case
          </a>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            You can respond or mark your case as resolved at <a href="${caseUrl}">claimit.id</a>.
          </p>
        </div>
      </div>
    `,
  });

  return result;
}
