import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { StepIndicator } from '@/components/complaint/step-indicator';

const DraftViewer = dynamic(
  () => import('@/components/complaint/draft-viewer').then((m) => ({ default: m.DraftViewer })),
  {
    loading: () => (
      <div className="animate-pulse space-y-4 py-6">
        <div className="h-6 w-48 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-100" />
        <div className="h-64 rounded-lg bg-gray-100" />
      </div>
    ),
  },
);

interface PageProps {
  params: Promise<{ locale: string; slug: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'draft' });
  return {
    title: `${t('title', { defaultMessage: 'Review Draft' })} | ClaimIt`,
  };
}

export default async function DraftPage({ params }: PageProps) {
  const { slug, country } = await params;

  const supabase = await createClient();
  const { data: entity } = await supabase
    .from('company_entities')
    .select('id, local_name, company:companies!inner(canonical_name, global_slug)')
    .eq('company.global_slug', slug)
    .eq('country_code', country.toUpperCase())
    .single();

  if (!entity) notFound();

  const company = entity.company as unknown as { canonical_name: string };
  const displayName = (entity.local_name || company.canonical_name) as string;

  return (
    <div className="container-app max-w-2xl py-6">
      <StepIndicator currentStep={4} />
      <DraftViewer slug={slug} country={country.toUpperCase()} companyName={displayName} />
    </div>
  );
}
