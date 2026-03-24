'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

interface ResolveButtonProps {
  caseId: string;
  currentStatus: string;
}

export function ResolveButton({ caseId, currentStatus }: ResolveButtonProps) {
  const t = useTranslations('cases');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isResolved = currentStatus === 'resolved' || currentStatus === 'closed';

  async function handleResolve() {
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (isResolved) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-medium text-green-700">
          {t('resolved', { defaultMessage: 'This case has been resolved' })}
        </span>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={handleResolve} loading={loading} className="gap-1.5">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {t('markResolved', { defaultMessage: 'Mark as Resolved' })}
    </Button>
  );
}
