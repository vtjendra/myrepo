import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CaseTimeline } from '@/components/case/case-timeline';
import { statusVariant } from '@/lib/case-status';
import type { CaseStatus } from '@/lib/supabase/types';

interface PageProps {
  params: Promise<{ locale: string; uuid: string }>;
}

export async function generateMetadata() {
  return {
    title: 'Case Details | ClaimIt',
    robots: { index: false },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { locale, uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}`);
  }

  const { data: caseData, error } = await supabase
    .from('cases')
    .select(`
      *,
      company_entity:company_entities (
        local_name, complaint_email, complaint_url,
        company:companies (canonical_name, global_slug, industry)
      ),
      responses (id, sender_type, content, created_at)
    `)
    .eq('id', uuid)
    .single();

  if (error || !caseData) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'cases' });
  const entity = caseData.company_entity as unknown as {
    local_name: string;
    company: { canonical_name: string };
  };
  const companyName = entity.local_name || entity.company.canonical_name;

  // Build timeline events
  type TimelineEvent = { id: string; type: 'created' | 'sent' | 'response' | 'status_change'; content: string; date: string; sender?: string };

  const events: TimelineEvent[] = [
    {
      id: 'created',
      type: 'created',
      content: t('caseCreated', { defaultMessage: 'Complaint created' }),
      date: caseData.created_at,
    },
  ];

  if (caseData.sent_at) {
    events.push({
      id: 'sent',
      type: 'sent',
      content: t('caseSent', { defaultMessage: 'Complaint sent to company' }),
      date: caseData.sent_at,
    });
  }

  const responses = (caseData.responses || []) as Array<{
    id: string;
    sender_type: string;
    content: string;
    created_at: string;
  }>;

  responses.forEach((r) => {
    events.push({
      id: r.id,
      type: 'response',
      content: r.content,
      date: r.created_at,
      sender: r.sender_type,
    });
  });

  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="container-app max-w-2xl py-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
          <p className="text-sm text-gray-500">
            {caseData.issue_category.replace(/_/g, ' ')}
          </p>
        </div>
        <Badge variant={statusVariant[caseData.status as CaseStatus]}>
          {caseData.status.replace(/_/g, ' ')}
        </Badge>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
            {t('complaintText', { defaultMessage: 'Complaint' })}
          </h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">{caseData.final_complaint}</p>
        </Card>

        {caseData.amount_involved && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">{t('amount', { defaultMessage: 'Amount' })}:</span>{' '}
            {caseData.currency_code} {Number(caseData.amount_involved).toLocaleString()}
          </div>
        )}

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">
            {t('timeline', { defaultMessage: 'Timeline' })}
          </h2>
          <CaseTimeline events={events} />
        </Card>
      </div>
    </div>
  );
}
