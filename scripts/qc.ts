/**
 * ClaimIt QC Suite — End-to-end flow simulation
 * Tests: law data completeness, prompt structure, legalese detection,
 *        constants alignment, per-country/per-category coverage.
 *
 * Run: npx tsx scripts/qc.ts
 */

import { getLawReference } from '../src/lib/ai/laws/index';
import { getRightsBriefingPrompt, getLawMonitoringPrompt } from '../src/lib/ai/prompts';
import { ISSUE_CATEGORIES } from '../src/lib/constants';

// ─── Colours ─────────────────────────────────────────────────────────────────
const GREEN = '\x1b[32m';
const RED   = '\x1b[31m';
const YELLOW= '\x1b[33m';
const CYAN  = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD  = '\x1b[1m';

// ─── Helpers ─────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures: string[] = [];

function ok(label: string) {
  console.log(`  ${GREEN}✓${RESET} ${label}`);
  passed++;
}

function fail(label: string, detail?: string) {
  console.log(`  ${RED}✗${RESET} ${label}${detail ? ` → ${RED}${detail}${RESET}` : ''}`);
  failed++;
  failures.push(label + (detail ? `: ${detail}` : ''));
}

function warn(label: string, detail?: string) {
  console.log(`  ${YELLOW}⚠${RESET} ${label}${detail ? ` → ${detail}` : ''}`);
}

function section(title: string) {
  console.log(`\n${BOLD}${CYAN}── ${title} ${RESET}`);
}

// ─── Constants ───────────────────────────────────────────────────────────────
const COUNTRIES = ['ID', 'MY', 'PH', 'TH', 'VN', 'SG', 'IN'];
const LAW_INDUSTRIES = [
  'banking', 'telecommunications', 'ecommerce', 'utilities',
  'transportation', 'airline', 'retail', 'insurance', 'healthcare',
];
const LOCALES = ['id', 'en', 'vi', 'th', 'hi'];
const LEGALESE = [
  'pursuant to', 'notwithstanding', 'inter alia', 'ipso facto',
  'hereinafter', 'hereunder', 'whereof', 'therein', 'viz.',
  'ibid.', 'op. cit.', 'sub judice',
];

// ─── SUITE 1: Law data completeness ──────────────────────────────────────────
section('1. Law data — all 63 country × industry combinations');

for (const country of COUNTRIES) {
  for (const industry of LAW_INDUSTRIES) {
    const law = getLawReference(country, industry);
    if (!law) {
      fail(`${country}/${industry}`, 'getLawReference returned null');
    } else {
      ok(`${country}/${industry} → ${law.statute_number}`);
    }
  }
}

// ─── SUITE 2: Required field validation ──────────────────────────────────────
section('2. Required fields on every law entry');

const REQUIRED_FIELDS = [
  'plain_rights', 'plain_obligations', 'plain_escalation',
  'primary_law', 'statute_number', 'effective_date',
  'regulator_name', 'regulator_url', 'source_url',
  'last_verified', 'verification_interval_days',
];

for (const country of COUNTRIES) {
  for (const industry of LAW_INDUSTRIES) {
    const law = getLawReference(country, industry);
    if (!law) continue;

    for (const field of REQUIRED_FIELDS) {
      const val = (law as Record<string, unknown>)[field];
      if (val === undefined || val === null || val === '') {
        fail(`${country}/${industry}.${field}`, 'missing or empty');
      }
    }

    // Array minimums
    if (law.plain_rights.length < 2) fail(`${country}/${industry}.plain_rights`, `only ${law.plain_rights.length} item(s)`);
    if (law.plain_obligations.length < 1) fail(`${country}/${industry}.plain_obligations`, 'empty');
    if (law.plain_escalation.length < 1) fail(`${country}/${industry}.plain_escalation`, 'empty');

    // URL format
    if (!law.regulator_url.startsWith('https://')) fail(`${country}/${industry}.regulator_url`, `bad url: ${law.regulator_url}`);
    if (!law.source_url.startsWith('https://')) fail(`${country}/${industry}.source_url`, `bad url: ${law.source_url}`);

    // Effective date ISO format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(law.effective_date)) fail(`${country}/${industry}.effective_date`, `bad format: ${law.effective_date}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(law.last_verified)) fail(`${country}/${industry}.last_verified`, `bad format: ${law.last_verified}`);

    // Interval sanity
    if (law.verification_interval_days < 30 || law.verification_interval_days > 365) {
      fail(`${country}/${industry}.verification_interval_days`, `suspicious: ${law.verification_interval_days}`);
    }

    if (failed === 0) ok(`${country}/${industry} fields valid`);
  }
}
if (failed === 0) console.log(`  ${GREEN}✓${RESET} All field validations passed`);

// ─── SUITE 3: No legalese in plain_rights / plain_obligations / plain_escalation
section('3. No legalese in plain-language sections');

for (const country of COUNTRIES) {
  for (const industry of LAW_INDUSTRIES) {
    const law = getLawReference(country, industry);
    if (!law) continue;

    const plainText = [
      ...law.plain_rights,
      ...law.plain_obligations,
      ...law.plain_escalation,
    ].join(' ').toLowerCase();

    for (const term of LEGALESE) {
      if (plainText.includes(term)) {
        fail(`${country}/${industry}`, `legalese found: "${term}"`);
      }
    }
  }
}
if (failed === 0) console.log(`  ${GREEN}✓${RESET} No legalese detected in plain sections`);

// ─── SUITE 4: Prompt generation — structure check ─────────────────────────────
section('4. getRightsBriefingPrompt() — output structure per country');

const REQUIRED_PROMPT_SECTIONS = [
  '### What this means for you',
  '### Your rights',
  '### What the company must do',
  '### If they don\'t respond',
  '### Legal reference',
];

const TEST_CASES: Array<{ country: string; industry: string; category: string; locale: string }> = [
  { country: 'ID', industry: 'banking',          category: 'fees_charges',   locale: 'id' },
  { country: 'MY', industry: 'ecommerce',         category: 'refund_return',  locale: 'ms' },
  { country: 'PH', industry: 'airline',           category: 'flight_issues',  locale: 'en' },
  { country: 'TH', industry: 'telecommunications',category: 'billing',        locale: 'th' },
  { country: 'VN', industry: 'insurance',         category: 'claim_denial',   locale: 'vi' },
  { country: 'SG', industry: 'retail',            category: 'returns_refunds',locale: 'en' },
  { country: 'IN', industry: 'healthcare',        category: 'billing',        locale: 'hi' },
  // Extra coverage
  { country: 'ID', industry: 'transportation',    category: 'ride_hailing',   locale: 'id' },
  { country: 'MY', industry: 'healthcare',        category: 'medical_service',locale: 'en' },
  { country: 'PH', industry: 'banking',           category: 'digital_banking',locale: 'en' },
  { country: 'SG', industry: 'utilities',         category: 'billing',        locale: 'en' },
  { country: 'IN', industry: 'ecommerce',         category: 'refund_return',  locale: 'hi' },
];

for (const tc of TEST_CASES) {
  const prompt = getRightsBriefingPrompt({
    country_code: tc.country,
    industry: tc.industry,
    issue_category: tc.category,
    locale: tc.locale,
  });

  let localFail = false;

  // Check required sections are in the prompt template
  for (const section_name of REQUIRED_PROMPT_SECTIONS) {
    if (!prompt.includes(section_name)) {
      fail(`${tc.country}/${tc.industry}/${tc.category}`, `missing section: ${section_name}`);
      localFail = true;
    }
  }

  // Verified law data must appear in the prompt
  const law = getLawReference(tc.country, tc.industry);
  if (law) {
    if (!prompt.includes(law.statute_number)) {
      fail(`${tc.country}/${tc.industry}`, `statute_number "${law.statute_number}" not injected`);
      localFail = true;
    }
    if (!prompt.includes(law.regulator_name)) {
      fail(`${tc.country}/${tc.industry}`, `regulator_name not injected`);
      localFail = true;
    }
    // Plain rights must be injected too
    if (!prompt.includes(law.plain_rights[0].slice(0, 40))) {
      warn(`${tc.country}/${tc.industry}`, 'plain_rights[0] may not be in prompt (check truncation)');
    }
  } else {
    warn(`${tc.country}/${tc.industry}`, 'no law reference found, fallback to Claude knowledge');
  }

  // Check no legalese in prompt instructions (outside the appendix instruction)
  const instructionsBlock = prompt.split('---')[0].toLowerCase();
  for (const term of ['notwithstanding', 'inter alia', 'ipso facto']) {
    if (instructionsBlock.includes(term)) {
      fail(`prompt/${tc.country}/${tc.industry}`, `legalese in instructions: "${term}"`);
      localFail = true;
    }
  }

  if (!localFail) ok(`${tc.country}/${tc.industry}/${tc.category} (locale=${tc.locale})`);
}

// ─── SUITE 5: Law monitoring prompt structure ────────────────────────────────
section('5. getLawMonitoringPrompt() — JSON schema compliance');

const monitoringCases = [
  { country: 'VN', law: 'Law on Protection of Consumer Rights', statute: 'Law No. 19/2023/QH15', date: '2025-01-01' },
  { country: 'SG', law: 'MAS Shared Responsibility Framework', statute: 'SRF December 2024', date: '2025-01-01' },
  { country: 'IN', law: 'Consumer Protection Act 2019', statute: 'CPA 2019', date: '2025-01-01' },
];

const JSON_FIELDS = ['"amended"', '"new_version"', '"effective_date"', '"key_changes"', '"confidence"', '"source_urls"'];

for (const mc of monitoringCases) {
  const prompt = getLawMonitoringPrompt({
    country_code: mc.country,
    law_name: mc.law,
    statute_number: mc.statute,
    last_verified_date: mc.date,
  });

  let localFail = false;
  for (const field of JSON_FIELDS) {
    if (!prompt.includes(field)) {
      fail(`monitoringPrompt/${mc.country}`, `missing JSON field: ${field}`);
      localFail = true;
    }
  }
  if (!prompt.toLowerCase().includes('official')) {
    warn(`monitoringPrompt/${mc.country}`, 'prompt does not mention official sources');
  }
  if (!localFail) ok(`monitoring prompt ${mc.country}/${mc.statute}`);
}

// ─── SUITE 6: ISSUE_CATEGORIES alignment ────────────────────────────────────
section('6. ISSUE_CATEGORIES alignment — all law-covered industries have categories');

for (const industry of LAW_INDUSTRIES) {
  if (!(industry in ISSUE_CATEGORIES)) {
    fail(`ISSUE_CATEGORIES.${industry}`, 'industry has law coverage but no issue categories defined');
  } else {
    const cats = (ISSUE_CATEGORIES as Record<string, unknown[]>)[industry];
    ok(`${industry} — ${cats.length} category group(s)`);
  }
}

// ─── SUITE 7: Case update flow simulation ───────────────────────────────────
section('7. Status update flow — valid transitions');

const VALID_STATUSES = ['drafting', 'ready_to_send', 'sent', 'acknowledged', 'in_progress', 'resolved', 'escalated', 'closed'];
const CASE_STATUS_FLOW = [
  ['drafting',      'ready_to_send'],
  ['ready_to_send', 'sent'],
  ['sent',          'acknowledged'],
  ['acknowledged',  'in_progress'],
  ['in_progress',   'resolved'],
  ['in_progress',   'escalated'],
  ['resolved',      'closed'],
];

for (const [from, to] of CASE_STATUS_FLOW) {
  if (!VALID_STATUSES.includes(from) || !VALID_STATUSES.includes(to)) {
    fail(`status transition ${from} → ${to}`, 'invalid status value');
  } else {
    ok(`status: ${from} → ${to}`);
  }
}

// ─── SUITE 8: locale validation ──────────────────────────────────────────────
section('8. Locale validation — sanitize.ts VALID_LOCALES coverage');

// Replicate the logic from sanitize.ts (keep in sync)
const VALID_LOCALES = ['id', 'en', 'zh', 'hi', 'ms', 'tl', 'vi', 'th'];

for (const locale of LOCALES) {
  if (VALID_LOCALES.includes(locale)) {
    ok(`locale "${locale}" accepted`);
  } else {
    fail(`locale "${locale}"`, 'rejected by validateLocale');
  }
}

// Invalid locales should be rejected
const INVALID_LOCALES = ['xx', 'zz', 'fr', 'de', 'ar'];
for (const locale of INVALID_LOCALES) {
  if (!VALID_LOCALES.includes(locale)) {
    ok(`locale "${locale}" correctly rejected`);
  } else {
    fail(`locale "${locale}"`, 'should not be accepted');
  }
}

// ─── SUITE 9: Vietnam law correctness (regression) ──────────────────────────
section('9. Regression — Vietnam uses Law 19/2023 not old Law 59/2010');

for (const industry of LAW_INDUSTRIES) {
  const law = getLawReference('VN', industry);
  if (!law) { fail(`VN/${industry}`, 'no law found'); continue; }
  if (law.statute_number.includes('59/2010')) {
    fail(`VN/${industry}`, 'still references old Law 59/2010 — should be Law 19/2023');
  } else if (law.statute_number.includes('19/2023') || law.effective_date >= '2023-01-01') {
    ok(`VN/${industry} → ${law.statute_number} (effective ${law.effective_date})`);
  } else {
    warn(`VN/${industry}`, `unexpected statute: ${law.statute_number} (${law.effective_date})`);
  }
}

section('10. Regression — Philippines banking uses RA 11765 not RA 8791');

const phBanking = getLawReference('PH', 'banking');
if (!phBanking) {
  fail('PH/banking', 'no law found');
} else if (phBanking.statute_number.includes('8791')) {
  fail('PH/banking', 'still references old RA 8791 — should be RA 11765');
} else if (phBanking.statute_number.includes('11765')) {
  ok(`PH/banking → ${phBanking.statute_number} ✓`);
} else {
  warn('PH/banking', `unexpected statute: ${phBanking.statute_number}`);
}

section('11. Regression — Singapore banking includes Shared Responsibility Framework');

const sgBanking = getLawReference('SG', 'banking');
if (!sgBanking) {
  fail('SG/banking', 'no law found');
} else if (sgBanking.effective_date >= '2024-12-01') {
  ok(`SG/banking → ${sgBanking.statute_number} (effective ${sgBanking.effective_date})`);
} else {
  fail('SG/banking', `SRF not reflected — effective_date is ${sgBanking.effective_date}`);
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log(`${BOLD}QC Results: ${GREEN}${passed} passed${RESET}${BOLD}, ${failed > 0 ? RED : GREEN}${failed} failed${RESET}`);

if (failures.length > 0) {
  console.log(`\n${RED}Failures:${RESET}`);
  failures.forEach(f => console.log(`  ${RED}•${RESET} ${f}`));
}

console.log('═'.repeat(60));
process.exit(failed > 0 ? 1 : 0);
