import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { statusVariant } from '@/lib/case-status';
import type { CaseStatus } from '@/lib/supabase/types';

interface CaseCardProps {
  caseData: {
    id: string;
    issue_category: string;
    status: CaseStatus;
    amount_involved: number | null;
    currency_code: string;
    created_at: string;
    company_entity?: {
      local_name: string;
      company?: {
        canonical_name: string;
      };
    };
  };
}

export function CaseCard({ caseData }: CaseCardProps) {
  const companyName =
    caseData.company_entity?.local_name ||
    caseData.company_entity?.company?.canonical_name ||
    'Unknown';

  return (
    <Card className="transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900">{companyName}</p>
          <p className="mt-0.5 text-sm text-gray-500">
            {caseData.issue_category.replace(/_/g, ' ')}
          </p>
        </div>
        <Badge variant={statusVariant[caseData.status]}>
          {caseData.status.replace(/_/g, ' ')}
        </Badge>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(caseData.created_at).toLocaleDateString()}</span>
        {caseData.amount_involved && (
          <span>
            {caseData.currency_code} {caseData.amount_involved.toLocaleString()}
          </span>
        )}
      </div>
    </Card>
  );
}
