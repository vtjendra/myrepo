import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CaseTimeline } from '@/components/case/case-timeline';
import { ResolveButton } from '@/components/case/resolve-button';
import { ShareButtons } from '@/components/case/share-buttons';
import { UpvoteButton } from '@/components/case/upvote-button';
import { ShareEncouragement } from '@/components/case/share-encouragement';
import { JsonLd } from '@/components/seo/json-ld';
import type { CaseStatus } from '@/lib/supabase/types';

interface PageProps {
  params: Promise<{ locale: string; uuid: string }>;
}

const statusVariant: Record<CaseStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  drafting: 'default',
  ready_to_send: 'warning',
  sent: 'info',
  acknowledged: 'info',
  in_progress: 'warning',
  resolved: 'success',
  escalated: 'error',
  closed: 'default',
};

export async function generateMetadata({ params }: PageProps) {
  const { uuid } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from('cases')
    .select(`
      issue_category, is_public, status,
      company_entity:company_entities (
        local_name,
        company:companies (canonical_name)
      )
    `)
    .eq('id', uuid)
    .single();

  if (!data || !data.is_public) {
    return { title: 'Case Details | ClaimIt', robots: { index: false } };
  }

  const entity = data.company_entity as unknown as { local_name: string; company: { canonical_name: string } };
  const companyName = entity.local_name || entity.company.canonical_name;

  return {
    title: `${companyName} - ${data.issue_category.replace(/_/g, ' ')} | ClaimIt`,
    description: `Public complaint against ${companyName} for ${data.issue_category.replace(/_/g, ' ')}. Status: ${data.status.replace(/_/g, ' ')}.`,
    robots: { index: data.is_public },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { locale, uuid } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: caseData, error } = await supabase
    .from('cases')
    .select(`
      *,
      company_entity:company_entities (
        id, local_name, complaint_email, complaint_url, country_code,
        company:companies (canonical_name, global_slug, industry)
      ),
      responses (id, sender_type, content, created_at)
    `)
    .eq('id', uuid)
    .single();

  if (error || !caseData) {
    notFound();
  }

  // If not public and not the owner, redirect
  const isOwner = user?.id === caseData.user_id;
  if (!caseData.is_public && !isOwner) {
    redirect(`/${locale}`);
  }

  const t = await getTranslations({ locale, namespace: 'cases' });
  const entity = caseData.company_entity as unknown as {
    id: string;
    local_name: string;
    country_code: string;
    company: { canonical_name: string; global_slug: string; industry: string };
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

  // Determine if we should show the "share to get help" encouragement
  const isUnresolved = ['sent', 'acknowledged', 'in_progress', 'escalated'].includes(caseData.status);

  return (
    <div className="container-app max-w-2xl py-6">
      {/* SEO structured data for public cases */}
      {caseData.is_public && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Organization',
              name: companyName,
            },
            author: { '@type': 'Person', name: 'Anonymous Consumer' },
            reviewBody: caseData.what_happened,
            datePublished: caseData.created_at,
          }}
        />
      )}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
          <p className="text-sm text-gray-500">
            {caseData.issue_category.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {caseData.is_public && (
            <Badge variant="info">
              {t('public', { defaultMessage: 'Public' })}
            </Badge>
          )}
          <Badge variant={statusVariant[caseData.status as CaseStatus]}>
            {caseData.status.replace(/_/g, ' ')}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upvote + Share for public cases */}
        {caseData.is_public && (
          <div className="flex items-center justify-between">
            <UpvoteButton caseId={caseData.id} initialCount={caseData.upvote_count} />
            <ShareButtons
              caseId={caseData.id}
              companyName={companyName}
              issueCategory={caseData.issue_category}
            />
          </div>
        )}

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

        {/* Evidence */}
        {caseData.evidence_urls && caseData.evidence_urls.length > 0 && (
          <Card>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
              {t('evidenceTitle', { defaultMessage: 'Evidence' })}
            </h2>
            <p className="text-sm text-gray-600">
              {t('evidenceCount', { defaultMessage: '{count} file(s) attached', count: caseData.evidence_urls.length })}
            </p>
          </Card>
        )}

        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">
            {t('timeline', { defaultMessage: 'Timeline' })}
          </h2>
          <CaseTimeline events={events} />
        </Card>

        {/* Owner actions */}
        {isOwner && (
          <div className="space-y-4">
            <ResolveButton caseId={caseData.id} currentStatus={caseData.status} />

            {/* Encourage sharing if unresolved */}
            {isUnresolved && caseData.is_public && (
              <ShareEncouragement
                caseId={caseData.id}
                companyName={companyName}
                issueCategory={caseData.issue_category}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
