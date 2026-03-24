'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CaseFeedCard } from '@/components/feed/case-feed-card';
import { Button } from '@/components/ui/button';

export interface FeedCase {
  id: string;
  issue_category: string;
  issue_subcategory: string | null;
  what_happened: string;
  status: 'sent' | 'acknowledged' | 'in_progress' | 'resolved' | 'escalated' | 'closed' | 'drafting' | 'ready_to_send';
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
}

interface PublicFeedProps {
  companyEntityId?: string;
  initialLimit?: number;
  initialCases?: FeedCase[];
  initialCursor?: string | null;
}

export function PublicFeed({ companyEntityId, initialLimit = 10, initialCases, initialCursor }: PublicFeedProps) {
  const t = useTranslations('feed');
  const [sort, setSort] = useState<'recent' | 'active'>('recent');
  const [cases, setCases] = useState<FeedCase[]>(initialCases ?? []);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor ?? null);
  const [loading, setLoading] = useState(!initialCases);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Skip fetch on initial mount if server-provided data exists
    if (initialCases && sort === 'recent' && !companyEntityId) return;

    setLoading(true);
    const params = new URLSearchParams({ sort, limit: String(initialLimit) });
    if (companyEntityId) params.set('company_entity_id', companyEntityId);

    fetch(`/api/feed?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setCases(data.cases || []);
        setNextCursor(data.nextCursor);
        if (data.userUpvotedIds) setUpvotedIds(new Set(data.userUpvotedIds));
      })
      .finally(() => setLoading(false));
  }, [sort, companyEntityId, initialLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadMore() {
    if (!nextCursor) return;
    setLoading(true);
    const params = new URLSearchParams({ sort, limit: String(initialLimit), cursor: nextCursor });
    if (companyEntityId) params.set('company_entity_id', companyEntityId);

    const data = await fetch(`/api/feed?${params}`).then((r) => r.json());
    setCases((prev) => [...prev, ...(data.cases || [])]);
    setNextCursor(data.nextCursor);
    if (data.userUpvotedIds) {
      setUpvotedIds((prev) => new Set([...prev, ...data.userUpvotedIds]));
    }
    setLoading(false);
  }

  return (
    <div>
      {/* Sort Tabs */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSort('recent')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            sort === 'recent'
              ? 'bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('sortRecent', { defaultMessage: 'Most Recent' })}
        </button>
        <button
          onClick={() => setSort('active')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            sort === 'active'
              ? 'bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('sortActive', { defaultMessage: 'Most Active' })}
        </button>
      </div>

      {/* Feed */}
      {loading && cases.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          {t('loading', { defaultMessage: 'Loading complaints...' })}
        </div>
      ) : cases.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          {t('empty', { defaultMessage: 'No public complaints yet. Be the first to file one!' })}
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => (
            <CaseFeedCard key={c.id} caseItem={c} userUpvoted={upvotedIds.has(c.id)} />
          ))}
        </div>
      )}

      {nextCursor && (
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={loadMore} loading={loading}>
            {t('loadMore', { defaultMessage: 'Load more' })}
          </Button>
        </div>
      )}
    </div>
  );
}
