'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { UpvoteButton } from '@/components/case/upvote-button';
import type { CaseStatus } from '@/lib/supabase/types';

interface CaseFeedCardProps {
  caseItem: {
    id: string;
    issue_category: string;
    issue_subcategory: string | null;
    what_happened: string;
    status: CaseStatus;
    upvote_count: number;
    created_at: string;
    company_entity: {
      local_name: string;
      country_code: string;
      company: {
        canonical_name: string;
        global_slug: string;
        industry: string;
        logo_url: string | null;
      };
    };
  };
  userUpvoted?: boolean;
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  sent: 'info',
  acknowledged: 'info',
  in_progress: 'warning',
  resolved: 'success',
  escalated: 'error',
};

export function CaseFeedCard({ caseItem, userUpvoted }: CaseFeedCardProps) {
  const t = useTranslations('feed');
  const entity = caseItem.company_entity;
  const company = entity.company;
  const companyName = entity.local_name || company.canonical_name;

  const timeAgo = getTimeAgo(caseItem.created_at);
  const truncatedText = caseItem.what_happened.length > 150
    ? caseItem.what_happened.slice(0, 150) + '...'
    : caseItem.what_happened;

  return (
    <Card padding="sm" className="transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
          {companyName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={{ pathname: '/companies/[slug]/[country]', params: { slug: company.global_slug, country: entity.country_code } }}
              className="text-sm font-semibold text-gray-900 hover:text-brand-600"
            >
              {companyName}
            </Link>
            <Badge variant={statusVariant[caseItem.status] || 'default'}>
              {caseItem.status.replace(/_/g, ' ')}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {caseItem.issue_category.replace(/_/g, ' ')}
            {caseItem.issue_subcategory && ` \u2022 ${caseItem.issue_subcategory.replace(/_/g, ' ')}`}
            {' \u2022 '}
            {timeAgo}
          </p>
          <p className="mt-2 text-sm text-gray-700">{truncatedText}</p>
          <div className="mt-3 flex items-center gap-3">
            <UpvoteButton caseId={caseItem.id} initialCount={caseItem.upvote_count} initialUpvoted={userUpvoted} />
            <Link
              href={{ pathname: '/cases/[uuid]', params: { uuid: caseItem.id } }}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              {t('viewDetails', { defaultMessage: 'View details' })}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString();
}
