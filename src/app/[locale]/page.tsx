import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { CompanySearch } from '@/components/company/company-search';
import { TopBrands } from '@/components/home/top-brands';
import { PublicFeed, type FeedCase } from '@/components/feed/public-feed';
import { JsonLd } from '@/components/seo/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `ClaimIt - ${t('heroTitle')}`,
    description: t('heroSubtitle'),
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

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

async function fetchStatsData(supabase: Awaited<ReturnType<typeof createClient>>): Promise<{ topIssues: BrandStat[]; topActive: BrandStat[] }> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: topIssuesRaw }, { data: topActiveRaw }] = await Promise.all([
    supabase
      .from('cases')
      .select(`
        company_entity_id,
        company_entity:company_entities (
          local_name, country_code,
          company:companies (canonical_name, global_slug, logo_url, industry)
        )
      `)
      .eq('is_public', true)
      .neq('status', 'drafting')
      .gte('created_at', sevenDaysAgo),
    supabase
      .from('cases')
      .select(`
        company_entity_id, upvote_count,
        company_entity:company_entities (
          local_name, country_code,
          company:companies (canonical_name, global_slug, logo_url, industry)
        ),
        responses (id)
      `)
      .eq('is_public', true)
      .neq('status', 'drafting')
      .gte('created_at', sevenDaysAgo),
  ]);

  type CompanyEntity = BrandStat['company_entity'];

  const issueCountMap = new Map<string, { count: number; entity: CompanyEntity }>();
  topIssuesRaw?.forEach((c) => {
    const existing = issueCountMap.get(c.company_entity_id);
    if (existing) {
      existing.count += 1;
    } else {
      issueCountMap.set(c.company_entity_id, { count: 1, entity: c.company_entity as unknown as CompanyEntity });
    }
  });

  const topIssues: BrandStat[] = Array.from(issueCountMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([entityId, data]) => ({
      company_entity_id: entityId,
      issue_count: data.count,
      company_entity: data.entity,
    }));

  const activityMap = new Map<string, { score: number; entity: CompanyEntity }>();
  topActiveRaw?.forEach((c) => {
    const responses = (c.responses as Array<{ id: string }>) || [];
    const activity = 1 + responses.length + (c.upvote_count || 0);
    const existing = activityMap.get(c.company_entity_id);
    if (existing) {
      existing.score += activity;
    } else {
      activityMap.set(c.company_entity_id, { score: activity, entity: c.company_entity as unknown as CompanyEntity });
    }
  });

  const topActive: BrandStat[] = Array.from(activityMap.entries())
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 5)
    .map(([entityId, data]) => ({
      company_entity_id: entityId,
      activity_score: data.score,
      company_entity: data.entity,
    }));

  return { topIssues, topActive };
}

async function fetchFeedData(supabase: Awaited<ReturnType<typeof createClient>>) {
  const limit = 10;
  const { data } = await supabase
    .from('cases')
    .select(`
      id, issue_category, issue_subcategory, what_happened, status,
      is_public, upvote_count, created_at, updated_at,
      company_entity:company_entities (
        id, local_name, country_code,
        company:companies (canonical_name, global_slug, industry, logo_url)
      )
    `)
    .eq('is_public', true)
    .neq('status', 'drafting')
    .order('created_at', { ascending: false })
    .limit(limit);

  const cases = (data || []) as unknown as FeedCase[];
  const nextCursor = cases.length === limit ? cases[cases.length - 1].created_at : null;
  return { cases, nextCursor };
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const supabase = await createClient();

  const [statsData, feedData] = await Promise.all([
    fetchStatsData(supabase),
    fetchFeedData(supabase),
  ]);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'ClaimIt',
          description: t('heroSubtitle'),
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: '/api/companies/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50 to-white px-4 py-16 sm:py-24">
        <div className="container-app text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8">
            <CompanySearch />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-app py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {t('howItWorksTitle')}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-600">
                {step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {t(`step${step}Title` as 'step1Title' | 'step2Title' | 'step3Title')}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t(`step${step}Desc` as 'step1Desc' | 'step2Desc' | 'step3Desc')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Brands Activity (last 7 days) */}
      <section className="bg-gray-50 py-12">
        <div className="container-app">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            {t('activityTitle', { defaultMessage: 'This Week on ClaimIt' })}
          </h2>
          <TopBrands initialIssues={statsData.topIssues} initialActive={statsData.topActive} />
        </div>
      </section>

      {/* Public Feed */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {t('feedTitle', { defaultMessage: 'Public Complaints' })}
        </h2>
        <PublicFeed initialLimit={10} initialCases={feedData.cases} initialCursor={feedData.nextCursor} />
      </section>
    </>
  );
}
