import 'server-only';

export interface IndustryLaw {
  // Plain language — used in the main body of rights briefings
  plain_rights: string[];
  plain_obligations: string[];
  plain_escalation: string[];

  // Legal appendix — cited at the bottom of briefings only
  primary_law: string;
  statute_number: string;
  effective_date: string; // ISO date
  regulator_name: string;
  regulator_url: string;
  regulator_complaint_url?: string;
  source_url: string;

  // Monitoring metadata
  last_verified: string; // ISO date
  verification_interval_days: number;
}

export type CountryLaws = Record<string, IndustryLaw>;
export type LawsMap = Record<string, CountryLaws>;
