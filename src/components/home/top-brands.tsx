'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BrandStat {
  company_entity_id: string;
  issue_count?: number;
  activity_score?: number;
  company_entity: {
    local_name: string;
    country_code: string;
    company: {
      canonical_name: string;
      global_slug: string;
      logo_url: string | null;
      industry: string;
    };
  };
}

export function TopBrands() {
  const t = useTranslations('home');
  const [topIssues, setTopIssues] = useState<BrandStat[]>([]);
  const [topActive, setTopActive] = useState<BrandStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setTopIssues(data.topBrandsByIssues || []);
        setTopActive(data.topBrandsByActivity || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="mb-3 h-6 w-48 rounded bg-gray-200" />
            <div className="space-y-2">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-14 rounded-lg bg-gray-100" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (topIssues.length === 0 && topActive.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {topIssues.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            {t('topIssuesTitle', { defaultMessage: 'Most Reported (7 days)' })}
          </h3>
          <div className="space-y-2">
            {topIssues.map((brand, i) => (
              <BrandRow key={brand.company_entity_id} brand={brand} rank={i + 1} metric={`${brand.issue_count} issues`} />
            ))}
          </div>
        </div>
      )}

      {topActive.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            {t('topActiveTitle', { defaultMessage: 'Most Active (7 days)' })}
          </h3>
          <div className="space-y-2">
            {topActive.map((brand, i) => (
              <BrandRow key={brand.company_entity_id} brand={brand} rank={i + 1} metric={`${brand.activity_score} activity`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BrandRow({ brand, rank, metric }: { brand: BrandStat; rank: number; metric: string }) {
  const entity = brand.company_entity;
  const company = entity.company;
  const name = entity.local_name || company.canonical_name;

  return (
    <Link
      href={{ pathname: '/companies/[slug]/[country]', params: { slug: company.global_slug, country: entity.country_code } }}
    >
      <Card padding="sm" className="flex items-center gap-3 transition-shadow hover:shadow-md">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
          {rank}
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{company.industry.replace(/_/g, ' ')}</p>
        </div>
        <Badge variant="warning">{metric}</Badge>
      </Card>
    </Link>
  );
}
