'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StepIndicator } from '@/components/complaint/step-indicator';
import { useParams } from 'next/navigation';

export default function SendPage() {
  const params = useParams<{ slug: string; country: string }>();
  const slug = params.slug;
  const country = params.country.toUpperCase();
  const key = makeKey(slug, country);

  const t = useTranslations('send');
  const tc = useTranslations('common');
  const router = useRouter();
  const { getComplaint, clearComplaint } = useComplaintStore();
  const complaint = getComplaint(key);

  const [authEmail, setAuthEmail] = useState('');
  const [authSent, setAuthSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Check auth on mount
  useState(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setIsAuthenticated(true);
    });
  });

  if (!complaint?.finalComplaint) {
    router.replace({ pathname: '/complain-about/[slug]/[country]/draft', params: { slug, country } });
    return null;
  }

  async function handleSignIn() {
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: authEmail,
      options: { shouldCreateUser: true },
    });
    if (authError) {
      setError(authError.message);
    } else {
      setAuthSent(true);
    }
  }

  async function handleSend() {
    setSending(true);
    setError(null);

    try {
      // Create case
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyEntityId: complaint!.companyEntityId,
          issueCategory: complaint!.issueCategory,
          issueSubcategory: complaint!.issueSubcategory,
          whatHappened: complaint!.whatHappened,
          whenOccurred: complaint!.whenOccurred,
          amountInvolved: complaint!.amountInvolved,
          currencyCode: complaint!.currencyCode,
          desiredOutcome: complaint!.desiredOutcome,
          draftComplaint: complaint!.draftComplaint,
          finalComplaint: complaint!.finalComplaint,
        }),
      });

      if (!caseRes.ok) {
        const err = await caseRes.json();
        throw new Error(err.error || 'Failed to create case');
      }

      const { id: caseId } = await caseRes.json();

      // Send the complaint email
      const sendRes = await fetch(`/api/cases/${caseId}/send`, {
        method: 'POST',
      });

      if (!sendRes.ok) {
        // Case created but email failed — still navigate to case
        console.error('Email send failed');
      }

      clearComplaint(key);
      router.push({ pathname: '/cases/[uuid]', params: { uuid: caseId } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container-app max-w-2xl py-6">
      <StepIndicator currentStep={5} />

      {!isAuthenticated ? (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            {t('authTitle', { defaultMessage: 'Sign in to send your complaint' })}
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            {t('authDescription', { defaultMessage: "We'll send you a magic link to verify your email." })}
          </p>

          {authSent ? (
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm text-green-700">
                {t('authCheckEmail', { defaultMessage: 'Check your email for the login link!' })}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                label="Email"
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="you@email.com"
              />
              <Button onClick={handleSignIn} fullWidth disabled={!authEmail}>
                {t('sendMagicLink', { defaultMessage: 'Send magic link' })}
              </Button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              {t('reviewTitle', { defaultMessage: 'Review and Send' })}
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium uppercase text-gray-500">
                  {t('company', { defaultMessage: 'Company' })}
                </span>
                <p className="text-sm font-medium text-gray-900">{complaint.companyName}</p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase text-gray-500">
                  {t('issue', { defaultMessage: 'Issue' })}
                </span>
                <p className="text-sm text-gray-700">
                  {complaint.issueCategory?.replace(/_/g, ' ')}
                  {complaint.issueSubcategory && ` — ${complaint.issueSubcategory.replace(/_/g, ' ')}`}
                </p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase text-gray-500">
                  {t('complaintPreview', { defaultMessage: 'Complaint' })}
                </span>
                <p className="mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-gray-700">
                  {complaint.finalComplaint}
                </p>
              </div>
            </div>
          </Card>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="sticky bottom-16 bg-white py-3 md:bottom-0">
            <Button onClick={handleSend} loading={sending} fullWidth size="lg">
              {t('sendComplaint', { defaultMessage: 'Send Complaint' })}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
