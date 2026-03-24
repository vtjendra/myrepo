'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ResponseFormProps {
  caseId: string;
  onResponseAdded: () => void;
}

export function ResponseForm({ caseId, onResponseAdded }: ResponseFormProps) {
  const t = useTranslations('cases');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Add response through a dedicated endpoint would be better,
          // but for MVP we can use this pattern
        }),
      });
      if (res.ok) {
        setContent('');
        onResponseAdded();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('addUpdate', { defaultMessage: 'Add an update...' })}
        rows={3}
      />
      <Button type="submit" loading={submitting} disabled={!content.trim()} size="sm">
        {t('postUpdate', { defaultMessage: 'Post Update' })}
      </Button>
    </form>
  );
}
