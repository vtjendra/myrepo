import { getTranslations } from 'next-intl/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/card';
import { JsonLd } from '@/components/seo/json-ld';

interface PageProps {
  params: Promise<{ locale: string; country: string; industry: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, country, industry } = await params;
  const t = await getTranslations({ locale, namespace: 'rights' });
  const industryName = industry.replace(/_/g, ' ');

  return {
    title: `${t('title', { defaultMessage: 'Consumer Rights' })} - ${industryName} in ${country} | ClaimIt`,
    description: `Consumer protection rights for ${industryName} industry in ${country}. Know your rights and how to file complaints.`,
  };
}

export default async function RightsGuidePage({ params }: PageProps) {
  const { locale, country, industry } = await params;

  const admin = createAdminClient();
  const { data: cached } = await admin
    .from('rights_cache')
    .select('content, updated_at')
    .eq('country_code', country.toUpperCase())
    .eq('industry', industry)
    .eq('locale', locale)
    .single();

  const industryName = industry.replace(/_/g, ' ');

  return (
    <div className="container-app max-w-2xl py-6">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `Consumer Rights - ${industryName} in ${country}`,
          dateModified: cached?.updated_at || new Date().toISOString(),
        }}
      />

      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Consumer Rights: {industryName}
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        {country.toUpperCase()} consumer protection guide
      </p>

      {cached ? (
        <Card>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
            {cached.content}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Last updated: {new Date(cached.updated_at).toLocaleDateString()}
          </p>
        </Card>
      ) : (
        <Card>
          <p className="text-gray-500">
            Rights guide for this industry and country is being generated.
            Please check back later.
          </p>
        </Card>
      )}
    </div>
  );
}
