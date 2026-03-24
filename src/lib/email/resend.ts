import 'server-only';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
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

  const result = await resend.emails.send({
    from: 'ClaimIt <complaints@claimit.id>',
    to: [to],
    replyTo: userEmail,
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
            This complaint was submitted through ClaimIt, Indonesia's consumer rights platform.
            Please respond directly to the consumer at ${userEmail}.
          </p>
        </div>
      </div>
    `,
  });

  return result;
}
