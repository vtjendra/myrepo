'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { ISSUE_CATEGORIES } from '@/lib/constants';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { Button } from '@/components/ui/button';
import type { Industry } from '@/lib/supabase/types';

interface IssueSelectorProps {
  industry: Industry;
  companyEntityId: string;
  companyName: string;
  slug: string;
  country: string;
}

export function IssueSelector({ industry, companyEntityId, companyName, slug, country }: IssueSelectorProps) {
  const t = useTranslations('categories');
  const tSub = useTranslations('subcategories');
  const router = useRouter();
  const { setCompany, setIssue } = useComplaintStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const categories = ISSUE_CATEGORIES[industry] || ISSUE_CATEGORIES.other;

  function handleContinue() {
    if (!selectedCategory) return;
    const key = makeKey(slug, country);
    setCompany(key, { companyEntityId, companyName, companySlug: slug, countryCode: country });
    setIssue(key, selectedCategory, selectedSub);
    router.push({ pathname: '/complain-about/[slug]/[country]/rights', params: { slug, country } });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t('title')}</h2>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { setSelectedCategory(cat.key); setSelectedSub(null); }}
            className={`rounded-xl border p-4 text-left transition-all ${
              selectedCategory === cat.key
                ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium text-gray-900">
              {tSub.has(cat.key) ? tSub(cat.key as 'other') : cat.key.replace(/_/g, ' ')}
            </span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">Specific issue</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories
              .find((c) => c.key === selectedCategory)
              ?.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                    selectedSub === sub
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tSub.has(sub) ? tSub(sub as 'other') : sub.replace(/_/g, ' ')}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-16 bg-white py-3 md:bottom-0">
        <Button onClick={handleContinue} disabled={!selectedCategory} fullWidth size="lg">
          {useTranslations('common')('next')}
        </Button>
      </div>
    </div>
  );
}
