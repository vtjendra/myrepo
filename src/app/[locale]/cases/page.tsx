import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/navigation';
import { CaseCard } from '@/components/case/case-card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  return {
    title: `${t('dashboardTitle', { defaultMessage: 'My Cases' })} | ClaimIt`,
    robots: { index: false },
  };
}

export default async function CasesDashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}`);
  }

  const { data: cases } = await supabase
    .from('cases')
    .select(`
      id, issue_category, status, amount_involved, currency_code, created_at,
      company_entity:company_entities (
        local_name,
        company:companies (canonical_name)
      )
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  const t = await getTranslations({ locale, namespace: 'cases' });

  return (
    <div className="container-app max-w-2xl py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {t('dashboardTitle', { defaultMessage: 'My Cases' })}
      </h1>

      {!cases || cases.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            {t('noCases', { defaultMessage: "You haven't filed any complaints yet." })}
          </p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {t('fileFirst', { defaultMessage: 'File your first complaint' })}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => {
            const entity = (c.company_entity as unknown as { local_name: string; company: { canonical_name: string }[] }[] | null);
            const caseCardData = {
              id: c.id,
              issue_category: c.issue_category,
              status: c.status as Parameters<typeof CaseCard>[0]['caseData']['status'],
              amount_involved: c.amount_involved,
              currency_code: c.currency_code,
              created_at: c.created_at,
              company_entity: entity?.[0] ? {
                local_name: entity[0].local_name,
                company: entity[0].company?.[0],
              } : undefined,
            };
            return (
              <Link key={c.id} href={{ pathname: '/cases/[uuid]', params: { uuid: c.id } }}>
                <CaseCard caseData={caseCardData} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
