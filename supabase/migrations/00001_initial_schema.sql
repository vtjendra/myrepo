-- ClaimIt MVP Database Schema

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE industry AS ENUM (
  'telecommunications', 'banking', 'insurance', 'airline',
  'ecommerce', 'utilities', 'government', 'healthcare',
  'education', 'transportation', 'food_beverage', 'technology', 'other'
);

CREATE TYPE desired_outcome AS ENUM (
  'refund', 'replacement', 'repair', 'apology',
  'policy_change', 'compensation', 'explanation', 'other'
);

CREATE TYPE case_status AS ENUM (
  'drafting', 'ready_to_send', 'sent', 'acknowledged',
  'in_progress', 'resolved', 'escalated', 'closed'
);

CREATE TYPE sender_type AS ENUM ('user', 'company', 'system');

CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');

-- ============================================================
-- TABLES
-- ============================================================

-- Companies (global)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_name TEXT NOT NULL,
  global_slug TEXT NOT NULL UNIQUE,
  website TEXT,
  logo_url TEXT,
  industry industry NOT NULL DEFAULT 'other',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_companies_slug ON companies (global_slug);
CREATE INDEX idx_companies_industry ON companies (industry);

-- Company entities (per-country)
CREATE TABLE company_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  country_code CHAR(2) NOT NULL,
  local_name TEXT NOT NULL,
  complaint_email TEXT,
  complaint_url TEXT,
  phone TEXT,
  address TEXT,
  regulator_name TEXT,
  regulator_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, country_code)
);

CREATE INDEX idx_company_entities_country ON company_entities (country_code);
CREATE INDEX idx_company_entities_company ON company_entities (company_id);

-- Users (synced from auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferred_locale TEXT NOT NULL DEFAULT 'id',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cases
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_entity_id UUID NOT NULL REFERENCES company_entities(id),
  issue_category TEXT NOT NULL,
  issue_subcategory TEXT,
  what_happened TEXT NOT NULL,
  when_occurred DATE,
  amount_involved NUMERIC(15,2),
  currency_code CHAR(3) NOT NULL DEFAULT 'IDR',
  desired_outcome desired_outcome NOT NULL DEFAULT 'other',
  draft_complaint TEXT NOT NULL,
  final_complaint TEXT NOT NULL,
  status case_status NOT NULL DEFAULT 'drafting',
  is_public BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cases_user ON cases (user_id);
CREATE INDEX idx_cases_company_entity ON cases (company_entity_id);
CREATE INDEX idx_cases_status ON cases (status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Responses (timeline entries)
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_responses_case ON responses (case_id);

-- Rights cache (LLM-generated, cached per country/industry/category)
CREATE TABLE rights_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code CHAR(2) NOT NULL,
  industry industry NOT NULL,
  issue_category TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'id',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(country_code, industry, issue_category, locale)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_user ON subscriptions (user_id);

-- ============================================================
-- TRIGGER: Auto-create user profile on auth signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE rights_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Companies: public read
CREATE POLICY "companies_select" ON companies FOR SELECT USING (true);

-- Company entities: public read
CREATE POLICY "company_entities_select" ON company_entities FOR SELECT USING (true);

-- Users: own data only
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);

-- Cases: own cases + public cases
CREATE POLICY "cases_select" ON cases FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "cases_insert_own" ON cases FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cases_update_own" ON cases FOR UPDATE
  USING (auth.uid() = user_id);

-- Responses: read if case belongs to user or is public
CREATE POLICY "responses_select" ON responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = responses.case_id
      AND (cases.user_id = auth.uid() OR cases.is_public = true)
    )
  );
CREATE POLICY "responses_insert_own" ON responses FOR INSERT
  WITH CHECK (
    sender_type = 'user'
    AND EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = responses.case_id
      AND cases.user_id = auth.uid()
    )
  );

-- Rights cache: public read, service role only for write
CREATE POLICY "rights_cache_select" ON rights_cache FOR SELECT USING (true);

-- Subscriptions: service role only (no user-facing policy for MVP)
-- No policies = only service role can access

-- ============================================================
-- STORAGE
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('evidence', 'evidence', false);

-- Storage policies: users can upload/read their own files
CREATE POLICY "evidence_upload" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'evidence'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "evidence_read" ON storage.objects FOR SELECT
  USING (
    bucket_id = 'evidence'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "evidence_delete" ON storage.objects FOR DELETE
  USING (
    bucket_id = 'evidence'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
