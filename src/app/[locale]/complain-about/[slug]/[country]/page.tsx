import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { StepIndicator } from '@/components/complaint/step-indicator';
import { IssueSelector } from '@/components/complaint/issue-selector';
import type { Industry } from '@/lib/supabase/types';

interface PageProps {
  params: Promise<{ locale: string; slug: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });
  return {
    title: `${t('title')} - ${slug} | ClaimIt`,
  };
}

export default async function IssueSelectionPage({ params }: PageProps) {
  const { slug, country } = await params;

  const supabase = await createClient();
  const { data: entity } = await supabase
    .from('company_entities')
    .select(`
      id,
      local_name,
      country_code,
      company:companies!inner (
        id,
        canonical_name,
        global_slug,
        industry
      )
    `)
    .eq('company.global_slug', slug)
    .eq('country_code', country.toUpperCase())
    .eq('is_active', true)
    .single();

  if (!entity) {
    notFound();
  }

  const company = entity.company as unknown as { id: string; canonical_name: string; global_slug: string; industry: Industry };

  return (
    <div className="container-app max-w-2xl py-6">
      <StepIndicator currentStep={1} />
      <h1 className="mb-6 text-xl font-bold text-gray-900">
        {entity.local_name || company.canonical_name}
      </h1>
      <IssueSelector
        industry={company.industry}
        companyEntityId={entity.id as string}
        companyName={(entity.local_name || company.canonical_name) as string}
        slug={slug}
        country={country.toUpperCase()}
      />
    </div>
  );
}
