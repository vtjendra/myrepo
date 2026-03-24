import type { CaseStatus } from '@/lib/supabase/types';

export const statusVariant: Record<CaseStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  drafting: 'default',
  ready_to_send: 'warning',
  sent: 'info',
  acknowledged: 'info',
  in_progress: 'warning',
  resolved: 'success',
  escalated: 'error',
  closed: 'default',
};
