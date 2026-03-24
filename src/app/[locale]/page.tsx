import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { CompanySearch } from '@/components/company/company-search';
import { TopBrands } from '@/components/home/top-brands';
import { PublicFeed } from '@/components/feed/public-feed';
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

export default function HomePage() {
  const t = useTranslations('home');

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
          <TopBrands />
        </div>
      </section>

      {/* Public Feed */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {t('feedTitle', { defaultMessage: 'Public Complaints' })}
        </h2>
        <PublicFeed initialLimit={10} />
      </section>
    </>
  );
}
