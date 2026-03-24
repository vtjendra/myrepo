import { Badge } from '@/components/ui/badge';

interface CompanyInfo {
  canonical_name: string;
  global_slug: string;
  industry: string;
  logo_url: string | null;
  entity?: {
    local_name: string;
    country_code: string;
  };
}

interface CompanyCardProps {
  company: CompanyInfo;
  compact?: boolean;
}

const industryColors: Record<string, string> = {
  telecommunications: 'info',
  banking: 'success',
  insurance: 'warning',
  airline: 'info',
  ecommerce: 'default',
  utilities: 'warning',
  government: 'error',
  healthcare: 'success',
  education: 'info',
  transportation: 'default',
  food_beverage: 'warning',
  technology: 'info',
  other: 'default',
};

export function CompanyCard({ company, compact }: CompanyCardProps) {
  const displayName = company.entity?.local_name || company.canonical_name;

  if (compact) {
    return (
      <>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
          {displayName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{displayName}</p>
          <p className="truncate text-xs text-gray-500">{company.industry.replace('_', ' ')}</p>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold text-gray-600">
        {displayName.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{displayName}</p>
        <Badge variant={industryColors[company.industry] as 'default' | 'success' | 'warning' | 'error' | 'info'}>
          {company.industry.replace('_', ' ')}
        </Badge>
      </div>
    </div>
  );
}
