import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { StepIndicator } from '@/components/complaint/step-indicator';
import { RightsCard } from '@/components/complaint/rights-card';

interface PageProps {
  params: Promise<{ locale: string; slug: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rights' });
  return {
    title: `${t('title', { defaultMessage: 'Your Consumer Rights' })} | ClaimIt`,
  };
}

export default async function RightsPage({ params }: PageProps) {
  const { slug, country } = await params;

  const supabase = await createClient();
  const { data: entity } = await supabase
    .from('company_entities')
    .select('id, company:companies!inner(industry)')
    .eq('company.global_slug', slug)
    .eq('country_code', country.toUpperCase())
    .single();

  if (!entity) notFound();

  const company = entity.company as unknown as { industry: string };

  return (
    <div className="container-app max-w-2xl py-6">
      <StepIndicator currentStep={2} />
      <RightsCard slug={slug} country={country.toUpperCase()} industry={company.industry} />
    </div>
  );
}
