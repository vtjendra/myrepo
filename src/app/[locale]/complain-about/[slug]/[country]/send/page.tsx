'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StepIndicator } from '@/components/complaint/step-indicator';
import { VisibilityToggle } from '@/components/complaint/visibility-toggle';
import { trackEvent } from '@/lib/analytics';
import { useParams } from 'next/navigation';

export default function SendPage() {
  const params = useParams<{ slug: string; country: string }>();
  const slug = params.slug;
  const country = params.country.toUpperCase();
  const key = makeKey(slug, country);

  const t = useTranslations('send');
  const router = useRouter();
  const { getComplaint, setVisibility, clearComplaint } = useComplaintStore();
  const complaint = getComplaint(key);

  const [authEmail, setAuthEmail] = useState('');
  const [authSent, setAuthSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setIsAuthenticated(true);
    });

    // Listen for auth state changes (e.g. after OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!complaint?.finalComplaint) {
    router.replace({ pathname: '/complain-about/[slug]/[country]/draft', params: { slug, country } });
    return null;
  }

  // Build the return URL so OAuth brings the user back to this exact page
  const callbackUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`
    : '/auth/callback';

  async function handleOAuthSignIn(provider: 'google' | 'facebook') {
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl },
    });
    if (authError) setError(authError.message);
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
          isPublic: complaint!.isPublic,
          evidenceUrls: complaint!.evidenceUrls,
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

      trackEvent('complaint_sent', { company_slug: slug, country });
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
          <p className="mb-6 text-sm text-gray-600">
            {t('authDescription', { defaultMessage: 'Create an account to track your complaint and get updates.' })}
          </p>

          {/* OAuth providers */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="tap-target flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('continueWithGoogle', { defaultMessage: 'Continue with Google' })}
            </button>

            <button
              onClick={() => handleOAuthSignIn('facebook')}
              className="tap-target flex w-full items-center justify-center gap-3 rounded-lg border border-transparent bg-[#1877F2] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#166FE5] active:bg-[#1565D8]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {t('continueWithFacebook', { defaultMessage: 'Continue with Facebook' })}
            </button>
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">
              {t('orContinueWithEmail', { defaultMessage: 'or continue with email' })}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Magic link fallback */}
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
              {complaint.evidenceUrls.length > 0 && (
                <div>
                  <span className="text-xs font-medium uppercase text-gray-500">
                    {t('evidence', { defaultMessage: 'Evidence' })}
                  </span>
                  <p className="text-sm text-gray-700">
                    {t('evidenceCount', { defaultMessage: '{count} file(s) attached', count: complaint.evidenceUrls.length })}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Public / Private Toggle */}
          <VisibilityToggle
            isPublic={complaint.isPublic}
            onChange={(isPublic) => setVisibility(key, isPublic)}
          />

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
