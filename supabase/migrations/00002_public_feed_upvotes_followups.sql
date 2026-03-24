-- Migration: Public feed, upvotes, follow-ups, evidence URLs
-- Adds support for public complaint feed, community upvoting, automated follow-ups,
-- and evidence file tracking on cases.

-- ============================================================
-- ADD evidence_urls TO cases
-- ============================================================
ALTER TABLE cases ADD COLUMN evidence_urls TEXT[] NOT NULL DEFAULT '{}';

-- ============================================================
-- UPVOTES TABLE
-- ============================================================
CREATE TABLE case_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(case_id, user_id)
);

CREATE INDEX idx_case_upvotes_case ON case_upvotes (case_id);
CREATE INDEX idx_case_upvotes_user ON case_upvotes (user_id);

-- Denormalized upvote count on cases for fast queries
ALTER TABLE cases ADD COLUMN upvote_count INTEGER NOT NULL DEFAULT 0;

-- ============================================================
-- FOLLOW-UPS TABLE
-- ============================================================
CREATE TABLE follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  CONSTRAINT follow_up_max_attempts CHECK (attempt_number <= 3)
);

CREATE INDEX idx_follow_ups_case ON follow_ups (case_id);

-- ============================================================
-- INDEXES FOR PUBLIC FEED QUERIES
-- ============================================================
CREATE INDEX idx_cases_public_recent ON cases (created_at DESC)
  WHERE is_public = true AND status != 'drafting';

CREATE INDEX idx_cases_public_upvotes ON cases (upvote_count DESC, created_at DESC)
  WHERE is_public = true AND status != 'drafting';

CREATE INDEX idx_cases_company_public ON cases (company_entity_id, created_at DESC)
  WHERE is_public = true;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE case_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;

-- Upvotes: anyone authenticated can read public case upvotes; users can insert/delete own
CREATE POLICY "upvotes_select" ON case_upvotes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases WHERE cases.id = case_upvotes.case_id AND cases.is_public = true
    )
  );

CREATE POLICY "upvotes_insert" ON case_upvotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "upvotes_delete" ON case_upvotes FOR DELETE
  USING (auth.uid() = user_id);

-- Follow-ups: only case owner can see their follow-ups
CREATE POLICY "follow_ups_select" ON follow_ups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases WHERE cases.id = follow_ups.case_id AND cases.user_id = auth.uid()
    )
  );

-- ============================================================
-- ANONYMOUS READ FOR PUBLIC CASES (feed page without login)
-- ============================================================
-- Allow anonymous users to read public cases
CREATE POLICY "cases_select_anon" ON cases FOR SELECT
  USING (is_public = true AND status != 'drafting');

-- Allow anonymous read of public case upvotes
CREATE POLICY "upvotes_select_anon" ON case_upvotes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cases WHERE cases.id = case_upvotes.case_id AND cases.is_public = true
    )
  );

-- ============================================================
-- FUNCTION: increment/decrement upvote count
-- ============================================================
CREATE OR REPLACE FUNCTION update_upvote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE cases SET upvote_count = upvote_count + 1 WHERE id = NEW.case_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE cases SET upvote_count = upvote_count - 1 WHERE id = OLD.case_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER upvote_count_trigger
  AFTER INSERT OR DELETE ON case_upvotes
  FOR EACH ROW EXECUTE FUNCTION update_upvote_count();
