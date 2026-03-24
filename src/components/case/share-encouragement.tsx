'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { ShareButtons } from '@/components/case/share-buttons';

interface ShareEncouragementProps {
  caseId: string;
  companyName: string;
  issueCategory: string;
}

export function ShareEncouragement({ caseId, companyName, issueCategory }: ShareEncouragementProps) {
  const t = useTranslations('cases');

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <h3 className="text-sm font-semibold text-yellow-800">
        {t('shareEncourageTitle', { defaultMessage: 'Not resolved yet?' })}
      </h3>
      <p className="mt-1 text-xs text-yellow-700">
        {t('shareEncourageDesc', {
          defaultMessage:
            'Share your complaint with friends and on social media. More visibility means more pressure on the company to respond.',
        })}
      </p>
      <div className="mt-3">
        <ShareButtons
          caseId={caseId}
          companyName={companyName}
          issueCategory={issueCategory}
        />
      </div>
    </Card>
  );
}
