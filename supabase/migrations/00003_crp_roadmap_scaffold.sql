-- CRP (Consumer Resolution Protocol) Roadmap Scaffold
-- Additive-only migration. No existing tables or columns are modified except:
--   1. New RLS policy on subscriptions
--   2. New nullable column on company_entities
-- Safe to apply against MVP data with no downtime.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Subscription RLS
--    Required before any tier-gating logic can ship. Users must be able to
--    read their own subscription row to determine their current plan.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. crp_enabled flag on company_entities
--    Marks whether a company entity has a registered CRP webhook endpoint.
--    Used to power the public registry badge. Defaults false — safe for all
--    existing rows.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE company_entities
  ADD COLUMN crp_enabled BOOLEAN NOT NULL DEFAULT false;


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. api_keys  (Phase 3 — Developer API)
--    Stores hashed API keys issued to Pro/Business/Enterprise users.
--    Plaintext keys are never persisted — only the SHA-256 hash.
--    key_prefix stores the first 16 chars for UI display (e.g. "crp_live_abc123")
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE api_keys (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name                 TEXT        NOT NULL,
  key_hash             TEXT        NOT NULL UNIQUE,
  key_prefix           TEXT        NOT NULL,
  tier                 subscription_tier NOT NULL,
  is_active            BOOLEAN     NOT NULL DEFAULT true,
  requests_this_month  INT         NOT NULL DEFAULT 0,
  last_used_at         TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own api keys"
  ON api_keys FOR ALL
  USING (auth.uid() = user_id);

-- key_hash index is hit on every authenticated API request
CREATE INDEX idx_api_keys_hash   ON api_keys(key_hash);
CREATE INDEX idx_api_keys_user   ON api_keys(user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. company_webhook_endpoints  (Phase 2 — CRP Registry)
--    Companies register a single HTTPS endpoint to receive structured CRP
--    complaint payloads. secret_hash is used to sign outbound payloads via HMAC.
--    One endpoint per company_entity enforced by UNIQUE constraint.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE company_webhook_endpoints (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_entity_id    UUID        NOT NULL REFERENCES company_entities(id) ON DELETE CASCADE,
  endpoint_url         TEXT        NOT NULL,
  secret_hash          TEXT        NOT NULL,
  is_active            BOOLEAN     NOT NULL DEFAULT true,
  avg_response_hours   NUMERIC(5,1),
  resolution_rate      NUMERIC(4,3),         -- 0.000–1.000
  total_received       INT         NOT NULL DEFAULT 0,
  total_resolved       INT         NOT NULL DEFAULT 0,
  last_active_at       TIMESTAMPTZ,
  registered_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_entity_id)
);

-- Service-role only for MVP — no user-facing policies yet
ALTER TABLE company_webhook_endpoints ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_webhook_endpoints_entity ON company_webhook_endpoints(company_entity_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. crp_delivery_status enum + webhook_deliveries  (Phase 2 — CRP Audit Trail)
--    Every CRP complaint delivery attempt is logged here. Provides full audit
--    trail and drives retry logic. resolution_payload stores the company's
--    status-callback JSON when they resolve the complaint.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TYPE crp_delivery_status AS ENUM (
  'pending',
  'delivered',
  'failed',
  'acknowledged',
  'resolved'
);

CREATE TABLE webhook_deliveries (
  id                   UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id              UUID                NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  company_entity_id    UUID                NOT NULL REFERENCES company_entities(id),
  status               crp_delivery_status NOT NULL DEFAULT 'pending',
  attempts             INT                 NOT NULL DEFAULT 0,
  last_attempted_at    TIMESTAMPTZ,
  delivered_at         TIMESTAMPTZ,
  resolution_payload   JSONB,
  created_at           TIMESTAMPTZ         NOT NULL DEFAULT now()
);

-- Service-role only for MVP
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_deliveries_case     ON webhook_deliveries(case_id);
CREATE INDEX idx_deliveries_entity   ON webhook_deliveries(company_entity_id);
CREATE INDEX idx_deliveries_status   ON webhook_deliveries(status);
