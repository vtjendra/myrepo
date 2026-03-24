'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SkeletonText } from '@/components/ui/skeleton';

interface RightsCardProps {
  slug: string;
  country: string;
  industry: string;
}

export function RightsCard({ slug, country, industry }: RightsCardProps) {
  const t = useTranslations('rights');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const key = makeKey(slug, country);
  const { getComplaint, setRights } = useComplaintStore();
  const complaint = getComplaint(key);

  const [loading, setLoading] = useState(true);
  const [rights, setRightsText] = useState<string | null>(complaint?.rightsCardText || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!complaint?.issueCategory) {
      router.replace({ pathname: '/complain-about/[slug]/[country]', params: { slug, country } });
      return;
    }

    if (rights) {
      setLoading(false);
      return;
    }

    async function fetchRights() {
      try {
        const res = await fetch('/api/ai/rights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            country_code: country,
            industry,
            issue_category: complaint!.issueCategory,
            locale,
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch rights');

        const data = await res.json();
        setRightsText(data.content);
        setRights(key, data.content);
      } catch {
        setError(t('errorLoading', { defaultMessage: 'Could not load rights information. You can still continue.' }));
      } finally {
        setLoading(false);
      }
    }

    fetchRights();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          {t('title', { defaultMessage: 'Your Consumer Rights' })}
        </h2>
        {loading ? (
          <SkeletonText lines={8} />
        ) : error ? (
          <p className="text-sm text-amber-600">{error}</p>
        ) : (
          <>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {rights}
            </div>
            <p className="mt-3 text-xs text-gray-500 italic">
              {t('disclaimer', { defaultMessage: 'This information is AI-generated and may not be fully accurate. Verify important details with official sources.' })}
            </p>
          </>
        )}
      </Card>

      <div className="sticky bottom-16 space-y-2 bg-white py-3 md:bottom-0">
        <Button
          onClick={() => router.push({ pathname: '/complain-about/[slug]/[country]/details', params: { slug, country } })}
          fullWidth
          size="lg"
        >
          {tc('next')}
        </Button>
        <Button
          variant="ghost"
          onClick={() => router.push({ pathname: '/complain-about/[slug]/[country]', params: { slug, country } })}
          fullWidth
        >
          {tc('back', { defaultMessage: 'Back' })}
        </Button>
      </div>
    </div>
  );
}
