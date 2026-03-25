-- Migration: Law registry tables for verified consumer protection law references
-- Provides structured law metadata used to ground AI rights briefings in real,
-- current legislation instead of relying on training data alone.

-- ============================================================
-- LAWS_REGISTRY: one primary law per country+industry
-- ============================================================
CREATE TABLE laws_registry (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code              CHAR(2) NOT NULL,
  industry                  TEXT NOT NULL,
  law_name                  TEXT NOT NULL,
  statute_number            TEXT NOT NULL,
  effective_date            DATE NOT NULL,
  source_url                TEXT NOT NULL,
  regulator_name            TEXT NOT NULL,
  regulator_url             TEXT NOT NULL,
  regulator_complaint_url   TEXT,
  last_verified_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  verification_interval_days INT NOT NULL DEFAULT 90,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(country_code, industry)
);

CREATE INDEX idx_laws_registry_country_industry ON laws_registry (country_code, industry);

CREATE TRIGGER laws_registry_updated_at
  BEFORE UPDATE ON laws_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- LAW_VERSIONS: changelog when laws are amended
-- ============================================================
CREATE TABLE law_versions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id         UUID NOT NULL REFERENCES laws_registry(id) ON DELETE CASCADE,
  version_label  TEXT NOT NULL,
  amendment_date DATE NOT NULL,
  key_changes    TEXT NOT NULL,
  affects_rights BOOLEAN NOT NULL DEFAULT true,
  source_url     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_law_versions_law ON law_versions (law_id);

-- ============================================================
-- LINK rights_cache TO laws_registry
-- Nullable: cache entries created before registry populated keep working.
-- When a law is updated, set this to NULL to force regeneration.
-- ============================================================
ALTER TABLE rights_cache ADD COLUMN law_registry_id UUID REFERENCES laws_registry(id) ON DELETE SET NULL;

-- ============================================================
-- ROW LEVEL SECURITY
-- Both tables are publicly readable; writes are service-role only.
-- ============================================================
ALTER TABLE laws_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE law_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "laws_registry_select" ON laws_registry FOR SELECT USING (true);
CREATE POLICY "law_versions_select" ON law_versions FOR SELECT USING (true);
