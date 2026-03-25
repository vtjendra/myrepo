// Generated types for Supabase database
// Run: supabase gen types typescript --local > src/lib/supabase/types.ts

export type Industry =
  | 'telecommunications'
  | 'banking'
  | 'insurance'
  | 'airline'
  | 'ecommerce'
  | 'utilities'
  | 'government'
  | 'healthcare'
  | 'education'
  | 'transportation'
  | 'food_beverage'
  | 'technology'
  | 'retail'
  | 'other';

export type DesiredOutcome =
  | 'refund'
  | 'replacement'
  | 'repair'
  | 'apology'
  | 'policy_change'
  | 'compensation'
  | 'explanation'
  | 'other';

export type CaseStatus =
  | 'drafting'
  | 'ready_to_send'
  | 'sent'
  | 'acknowledged'
  | 'in_progress'
  | 'resolved'
  | 'escalated'
  | 'closed';

export type SenderType = 'user' | 'company' | 'system';

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing';

export interface Company {
  id: string;
  canonical_name: string;
  global_slug: string;
  website: string | null;
  logo_url: string | null;
  industry: Industry;
  is_active: boolean;
  created_at: string;
}

export interface CompanyEntity {
  id: string;
  company_id: string;
  country_code: string;
  local_name: string;
  complaint_email: string | null;
  complaint_url: string | null;
  phone: string | null;
  address: string | null;
  regulator_name: string | null;
  regulator_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  preferred_locale: string;
  created_at: string;
}

export interface Case {
  id: string;
  user_id: string;
  company_entity_id: string;
  issue_category: string;
  issue_subcategory: string | null;
  what_happened: string;
  when_occurred: string | null;
  amount_involved: number | null;
  currency_code: string;
  desired_outcome: DesiredOutcome;
  draft_complaint: string;
  final_complaint: string;
  status: CaseStatus;
  is_public: boolean;
  evidence_urls: string[];
  upvote_count: number;
  sent_at: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseUpvote {
  id: string;
  case_id: string;
  user_id: string;
  created_at: string;
}

export interface FollowUp {
  id: string;
  case_id: string;
  attempt_number: number;
  sent_at: string;
  status: string;
}

export interface Response {
  id: string;
  case_id: string;
  sender_type: SenderType;
  content: string;
  created_at: string;
}

export interface RightsCache {
  id: string;
  country_code: string;
  industry: Industry;
  issue_category: string;
  locale: string;
  content: string;
  law_registry_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface LawRegistry {
  id: string;
  country_code: string;
  industry: string;
  law_name: string;
  statute_number: string;
  effective_date: string;
  source_url: string;
  regulator_name: string;
  regulator_url: string;
  regulator_complaint_url: string | null;
  last_verified_at: string;
  verification_interval_days: number;
  created_at: string;
  updated_at: string;
}

export interface LawVersion {
  id: string;
  law_id: string;
  version_label: string;
  amendment_date: string;
  key_changes: string;
  affects_rights: boolean;
  source_url: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  created_at: string;
}

// Joined types for common queries
export interface CompanyWithEntity extends Company {
  entity: CompanyEntity;
}

export interface CaseWithCompany extends Case {
  company_entity: CompanyEntity & {
    company: Company;
  };
}
