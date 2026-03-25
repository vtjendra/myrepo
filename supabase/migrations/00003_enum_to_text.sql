-- Migration: Convert product-defined enums to TEXT for flexibility
-- Keeps Stripe-tied enums (subscription_tier, subscription_status) and
-- semantically fixed enums (sender_type) as enums.
-- Validation moves to Zod schemas in src/lib/validators/.

-- ============================================================
-- INDUSTRY: companies + rights_cache
-- ============================================================
ALTER TABLE companies ALTER COLUMN industry TYPE TEXT USING industry::TEXT;
ALTER TABLE companies ALTER COLUMN industry SET DEFAULT 'other';

ALTER TABLE rights_cache ALTER COLUMN industry TYPE TEXT USING industry::TEXT;

DROP TYPE industry;

-- ============================================================
-- DESIRED_OUTCOME: cases
-- ============================================================
ALTER TABLE cases ALTER COLUMN desired_outcome TYPE TEXT USING desired_outcome::TEXT;
ALTER TABLE cases ALTER COLUMN desired_outcome SET DEFAULT 'other';

DROP TYPE desired_outcome;

-- ============================================================
-- CASE_STATUS: cases
-- ============================================================
ALTER TABLE cases ALTER COLUMN status TYPE TEXT USING status::TEXT;
ALTER TABLE cases ALTER COLUMN status SET DEFAULT 'drafting';

DROP TYPE case_status;

-- ============================================================
-- INDEX: update industry index to work on text column
-- (DROP + recreate — no change in semantics)
-- ============================================================
DROP INDEX IF EXISTS idx_companies_industry;
CREATE INDEX idx_companies_industry ON companies (industry);
