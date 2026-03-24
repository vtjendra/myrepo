'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface DraftViewerProps {
  slug: string;
  country: string;
  companyName: string;
}

export function DraftViewer({ slug, country, companyName }: DraftViewerProps) {
  const t = useTranslations('draft');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const key = makeKey(slug, country);
  const { getComplaint, setDraft, setFinal } = useComplaintStore();
  const complaint = getComplaint(key);

  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateDraft = useCallback(async () => {
    if (!complaint?.whatHappened) {
      router.replace({ pathname: '/complain-about/[slug]/[country]/details', params: { slug, country } });
      return;
    }

    setIsStreaming(true);
    setStreamedText('');
    setError(null);

    try {
      const res = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          issue_category: complaint.issueCategory,
          issue_subcategory: complaint.issueSubcategory,
          what_happened: complaint.whatHappened,
          when_occurred: complaint.whenOccurred,
          amount_involved: complaint.amountInvolved,
          currency_code: complaint.currencyCode,
          desired_outcome: complaint.desiredOutcome,
          rights_text: complaint.rightsCardText,
          locale,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate draft');
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setStreamedText(fullText);
      }

      setDraft(key, fullText);
      setFinal(key, fullText);
      setEditText(fullText);
    } catch {
      setError(t('errorGenerating', { defaultMessage: 'Failed to generate draft. Please try again.' }));
    } finally {
      setIsStreaming(false);
    }
  }, [complaint, companyName, country, key, locale, router, setDraft, setFinal, slug, t]);

  useEffect(() => {
    if (complaint?.draftComplaint) {
      setStreamedText(complaint.draftComplaint);
      setEditText(complaint.finalComplaint || complaint.draftComplaint);
    } else {
      generateDraft();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSaveEdit() {
    setFinal(key, editText);
    setIsEditing(false);
  }

  function handleContinue() {
    if (isEditing) {
      setFinal(key, editText);
    }
    router.push({ pathname: '/complain-about/[slug]/[country]/send', params: { slug, country } });
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('title', { defaultMessage: 'Your Complaint Draft' })}
          </h2>
          {!isStreaming && streamedText && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? tc('cancel') : t('edit', { defaultMessage: 'Edit' })}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateDraft}
              >
                {t('regenerate', { defaultMessage: 'Regenerate' })}
              </Button>
            </div>
          )}
        </div>

        {error ? (
          <div className="space-y-3">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={generateDraft}>
              {tc('retry')}
            </Button>
          </div>
        ) : isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={15}
            />
            <Button variant="secondary" onClick={handleSaveEdit}>
              {tc('save')}
            </Button>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {streamedText || t('generating', { defaultMessage: 'Generating your complaint draft...' })}
            {isStreaming && <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-brand-600" />}
          </div>
        )}
      </Card>

      <div className="sticky bottom-16 bg-white py-3 md:bottom-0">
        <Button
          onClick={handleContinue}
          disabled={isStreaming || !streamedText}
          fullWidth
          size="lg"
        >
          {tc('next')}
        </Button>
      </div>
    </div>
  );
}
