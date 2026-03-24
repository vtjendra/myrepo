'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface UpvoteButtonProps {
  caseId: string;
  initialCount: number;
  initialUpvoted?: boolean;
}

export function UpvoteButton({ caseId, initialCount, initialUpvoted }: UpvoteButtonProps) {
  const t = useTranslations('feed');
  const [count, setCount] = useState(initialCount);
  const [upvoted, setUpvoted] = useState(initialUpvoted ?? false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Skip individual fetch if upvote status was provided (batch-fetched by feed API)
    if (initialUpvoted !== undefined) return;

    fetch(`/api/cases/${caseId}/upvote`)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.upvoteCount);
        setUpvoted(data.userUpvoted);
      })
      .catch(() => {});
  }, [caseId, initialUpvoted]);

  async function handleUpvote() {
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/upvote`, { method: 'POST' });
      if (res.status === 401) {
        // Not logged in — could redirect to login
        return;
      }
      const data = await res.json();
      setUpvoted(data.upvoted);
      setCount((prev) => (data.upvoted ? prev + 1 : prev - 1));
      trackEvent('upvote_toggled', { case_id: caseId });
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={upvoted ? 'primary' : 'outline'}
      size="sm"
      onClick={handleUpvote}
      disabled={loading}
      className="gap-1.5"
    >
      <svg
        className="h-4 w-4"
        fill={upvoted ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <span>{count}</span>
      <span className="sr-only">{t('upvote', { defaultMessage: 'Upvote' })}</span>
    </Button>
  );
}
