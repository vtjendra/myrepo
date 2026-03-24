import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { CompanySearch } from '@/components/company/company-search';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `ClaimIt - ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
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
    </>
  );
}
