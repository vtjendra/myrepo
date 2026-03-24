'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface UpvoteButtonProps {
  caseId: string;
  initialCount: number;
}

export function UpvoteButton({ caseId, initialCount }: UpvoteButtonProps) {
  const t = useTranslations('feed');
  const [count, setCount] = useState(initialCount);
  const [upvoted, setUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/cases/${caseId}/upvote`)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.upvoteCount);
        setUpvoted(data.userUpvoted);
      })
      .catch(() => {});
  }, [caseId]);

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
