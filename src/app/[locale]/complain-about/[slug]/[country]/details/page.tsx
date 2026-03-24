import { getTranslations } from 'next-intl/server';
import { StepIndicator } from '@/components/complaint/step-indicator';
import { ComplaintForm } from '@/components/complaint/complaint-form';

interface PageProps {
  params: Promise<{ locale: string; slug: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'complaintForm' });
  return {
    title: `${t('title', { defaultMessage: 'Complaint Details' })} | ClaimIt`,
  };
}

export default async function DetailsPage({ params }: PageProps) {
  const { slug, country } = await params;

  return (
    <div className="container-app max-w-2xl py-6">
      <StepIndicator currentStep={3} />
      <ComplaintForm slug={slug} country={country.toUpperCase()} />
    </div>
  );
}
