import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAnthropicClient } from '@/lib/ai/client';
import { getLawMonitoringPrompt } from '@/lib/ai/prompts';
import type { LawRegistry } from '@/lib/supabase/types';

// POST /api/admin/verify-laws
// Called by Vercel cron on the 1st of each month.
// Also callable manually by admins via POST with Authorization header.
//
// Flow:
// 1. Fetch laws_registry rows where next check is due
//    (last_verified_at + verification_interval_days <= now)
// 2. For each law, call Claude with getLawMonitoringPrompt
// 3. If amended:
//    a. Insert a row into law_versions
//    b. Update laws_registry.last_verified_at
//    c. Null out rights_cache.law_registry_id for that country+industry
//       so the cache is regenerated on the next user request
// 4. If not amended: update laws_registry.last_verified_at only
// 5. Return a summary

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Vercel cron passes CRON_SECRET in the Authorization header
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;

  // Alternatively, accept service role key for manual admin calls
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey && authHeader === `Bearer ${serviceKey}`) return true;

  return false;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();

  // Fetch laws due for verification
  const { data: laws, error: fetchError } = await supabase
    .from('laws_registry')
    .select('*')
    .lte(
      'last_verified_at',
      new Date(
        now.getTime() - 0 // we filter in JS using verification_interval_days below
      ).toISOString()
    );

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const due = (laws as LawRegistry[]).filter((law) => {
    const lastVerified = new Date(law.last_verified_at);
    const intervalMs = law.verification_interval_days * 24 * 60 * 60 * 1000;
    return now.getTime() - lastVerified.getTime() >= intervalMs;
  });

  if (due.length === 0) {
    return NextResponse.json({ message: 'No laws due for verification', checked: 0 });
  }

  const results: Array<{
    law: string;
    country: string;
    amended: boolean;
    confidence: string;
    error?: string;
  }> = [];

  for (const law of due) {
    try {
      const prompt = getLawMonitoringPrompt({
        country_code: law.country_code,
        law_name: law.law_name,
        statute_number: law.statute_number,
        last_verified_date: law.last_verified_at.split('T')[0],
      });

      const message = await getAnthropicClient().messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }],
      });

      const text =
        message.content[0].type === 'text' ? message.content[0].text.trim() : '';

      let parsed: {
        amended: boolean;
        new_version: string | null;
        effective_date: string | null;
        key_changes: string | null;
        confidence: 'high' | 'medium' | 'low';
        source_urls: string[];
      } | null = null;

      try {
        // Claude may wrap JSON in a code block — strip it if so
        const jsonText = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        parsed = JSON.parse(jsonText);
      } catch {
        results.push({
          law: law.law_name,
          country: law.country_code,
          amended: false,
          confidence: 'low',
          error: 'Failed to parse Claude response',
        });
        continue;
      }

      if (parsed!.amended && parsed!.key_changes) {
        // Record the amendment
        await supabase.from('law_versions').insert({
          law_id: law.id,
          version_label: parsed!.new_version ?? 'Amendment',
          amendment_date: parsed!.effective_date ?? now.toISOString().split('T')[0],
          key_changes: parsed!.key_changes,
          affects_rights: true,
          source_url: parsed!.source_urls[0] ?? null,
        });

        // Invalidate cached rights briefings for this country+industry
        await supabase
          .from('rights_cache')
          .update({ law_registry_id: null })
          .eq('country_code', law.country_code)
          .eq('industry', law.industry);
      }

      // Update last_verified_at regardless of outcome
      await supabase
        .from('laws_registry')
        .update({ last_verified_at: now.toISOString() })
        .eq('id', law.id);

      results.push({
        law: law.law_name,
        country: law.country_code,
        amended: parsed!.amended,
        confidence: parsed!.confidence,
      });
    } catch (err) {
      results.push({
        law: law.law_name,
        country: law.country_code,
        amended: false,
        confidence: 'low',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  const amendedCount = results.filter((r) => r.amended).length;

  return NextResponse.json({
    checked: results.length,
    amended: amendedCount,
    results,
  });
}

// Allow GET for a simple status check (returns laws due for verification without running checks)
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();

  const { data: laws, error } = await supabase
    .from('laws_registry')
    .select('country_code, industry, law_name, statute_number, last_verified_at, verification_interval_days')
    .order('last_verified_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const withStatus = (laws as LawRegistry[]).map((law) => {
    const lastVerified = new Date(law.last_verified_at);
    const intervalMs = law.verification_interval_days * 24 * 60 * 60 * 1000;
    const due = now.getTime() - lastVerified.getTime() >= intervalMs;
    const daysSince = Math.floor((now.getTime() - lastVerified.getTime()) / (24 * 60 * 60 * 1000));
    return {
      country_code: law.country_code,
      industry: law.industry,
      law_name: law.law_name,
      statute_number: law.statute_number,
      last_verified_at: law.last_verified_at,
      verification_interval_days: law.verification_interval_days,
      days_since_verification: daysSince,
      due_for_check: due,
    };
  });

  return NextResponse.json({
    total: withStatus.length,
    due: withStatus.filter((l) => l.due_for_check).length,
    laws: withStatus,
  });
}
