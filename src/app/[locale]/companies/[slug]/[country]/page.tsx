import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/json-ld';
import { PublicFeed } from '@/components/feed/public-feed';

interface PageProps {
  params: Promise<{ locale: string; slug: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug, country } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('company_entities')
    .select('local_name, company:companies!inner(canonical_name, global_slug)')
    .eq('company.global_slug', slug)
    .eq('country_code', country.toUpperCase())
    .single();

  if (!data) return { title: 'Company | ClaimIt' };

  const company = data.company as unknown as { canonical_name: string };
  const name = data.local_name || company.canonical_name;
  const t = await getTranslations({ locale, namespace: 'companies' });

  return {
    title: `${name} - ${t('complaints', { defaultMessage: 'Complaints' })} | ClaimIt`,
    description: t('profileDesc', { defaultMessage: `File a complaint against ${name}`, company: name }),
    alternates: {
      canonical: `/${locale}/companies/${slug}/${country}`,
    },
  };
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { locale, slug, country } = await params;
  const supabase = await createClient();

  const { data: entity } = await supabase
    .from('company_entities')
    .select(`
      id, local_name, country_code, complaint_email, complaint_url,
      phone, address, regulator_name, regulator_url,
      company:companies!inner (
        id, canonical_name, global_slug, industry, website, logo_url
      )
    `)
    .eq('company.global_slug', slug)
    .eq('country_code', country.toUpperCase())
    .single();

  if (!entity) notFound();

  const company = entity.company as unknown as {
    id: string; canonical_name: string; global_slug: string;
    industry: string; website: string | null;
  };

  const displayName = entity.local_name || company.canonical_name;
  const t = await getTranslations({ locale, namespace: 'companies' });

  // Get complaint stats
  const { count: totalCases } = await supabase
    .from('cases')
    .select('id', { count: 'exact', head: true })
    .eq('company_entity_id', entity.id)
    .eq('is_public', true);

  const { count: resolvedCases } = await supabase
    .from('cases')
    .select('id', { count: 'exact', head: true })
    .eq('company_entity_id', entity.id)
    .eq('is_public', true)
    .eq('status', 'resolved');

  const resolutionRate = totalCases && totalCases > 0 ? Math.round(((resolvedCases || 0) / totalCases) * 100) : null;

  return (
    <div className="container-app max-w-2xl py-6">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: displayName,
          url: company.website || undefined,
          industry: company.industry,
          aggregateRating: totalCases && totalCases > 0 ? {
            '@type': 'AggregateRating',
            ratingCount: totalCases,
            reviewCount: totalCases,
          } : undefined,
        }}
      />

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-2xl font-bold text-gray-600">
          {displayName.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
          <Badge>{company.industry.replace(/_/g, ' ')}</Badge>
        </div>
      </div>

      {totalCases !== null && totalCases > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card padding="sm">
            <p className="text-2xl font-bold text-gray-900">{totalCases}</p>
            <p className="text-xs text-gray-500">
              {t('complaintsCount', { defaultMessage: 'Complaints filed' })}
            </p>
          </Card>
          {resolutionRate !== null && (
            <Card padding="sm">
              <p className="text-2xl font-bold text-green-600">{resolutionRate}%</p>
              <p className="text-xs text-gray-500">
                {t('resolvedRate', { defaultMessage: 'Resolved' })}
              </p>
            </Card>
          )}
        </div>
      )}

      <Card className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          {t('contact', { defaultMessage: 'Contact' })}
        </h2>
        <dl className="space-y-2 text-sm">
          {company.website && (
            <div>
              <dt className="text-gray-500">{t('website', { defaultMessage: 'Website' })}</dt>
              <dd><a href={company.website} className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">{company.website}</a></dd>
            </div>
          )}
          {entity.complaint_email && (
            <div>
              <dt className="text-gray-500">{t('complaintEmail', { defaultMessage: 'Complaint Email' })}</dt>
              <dd className="text-gray-900">{entity.complaint_email}</dd>
            </div>
          )}
          {entity.phone && (
            <div>
              <dt className="text-gray-500">{t('phone', { defaultMessage: 'Phone' })}</dt>
              <dd className="text-gray-900">{entity.phone}</dd>
            </div>
          )}
          {entity.regulator_name && (
            <div>
              <dt className="text-gray-500">{t('regulator', { defaultMessage: 'Regulator' })}</dt>
              <dd>
                {entity.regulator_url ? (
                  <a href={entity.regulator_url} className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {entity.regulator_name}
                  </a>
                ) : (
                  <span className="text-gray-900">{entity.regulator_name}</span>
                )}
              </dd>
            </div>
          )}
        </dl>
      </Card>

      <Link href={{ pathname: '/complain-about/[slug]/[country]', params: { slug, country } }}>
        <Button fullWidth size="lg">
          {t('fileComplaint', { defaultMessage: 'File a Complaint' })}
        </Button>
      </Link>

      {/* Public complaints feed for this company */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('publicComplaints', { defaultMessage: 'Public Complaints' })}
        </h2>
        <PublicFeed companyEntityId={entity.id} initialLimit={10} />
      </section>
    </div>
  );
}
