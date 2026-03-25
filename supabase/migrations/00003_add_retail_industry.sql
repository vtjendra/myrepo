-- The `retail` industry was defined in ISSUE_CATEGORIES and used in company seed data
-- but was missing from the industry enum. This migration adds it.

ALTER TYPE industry ADD VALUE IF NOT EXISTS 'retail';
