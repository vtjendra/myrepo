import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`stats:${ip}`, 30, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const supabase = await createClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Top 5 brands with most issues (last 7 days, public cases only)
  const { data: topIssues } = await supabase
    .from('cases')
    .select(`
      company_entity_id,
      company_entity:company_entities (
        local_name, country_code,
        company:companies (canonical_name, global_slug, logo_url, industry)
      )
    `)
    .eq('is_public', true)
    .neq('status', 'drafting')
    .gte('created_at', sevenDaysAgo);

  // Top 5 most active brands (by total activity: cases + responses, last 7 days)
  const { data: topActive } = await supabase
    .from('cases')
    .select(`
      company_entity_id, upvote_count,
      company_entity:company_entities (
        local_name, country_code,
        company:companies (canonical_name, global_slug, logo_url, industry)
      ),
      responses (id)
    `)
    .eq('is_public', true)
    .neq('status', 'drafting')
    .gte('created_at', sevenDaysAgo);

  // Aggregate top issues by company
  const issueCountMap = new Map<string, { count: number; entity: unknown }>();
  topIssues?.forEach((c) => {
    const key = c.company_entity_id;
    const existing = issueCountMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      issueCountMap.set(key, { count: 1, entity: c.company_entity });
    }
  });

  const topBrandsByIssues = Array.from(issueCountMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([entityId, data]) => ({
      company_entity_id: entityId,
      issue_count: data.count,
      company_entity: data.entity,
    }));

  // Aggregate top active brands (cases + responses + upvotes)
  const activityMap = new Map<string, { score: number; entity: unknown }>();
  topActive?.forEach((c) => {
    const key = c.company_entity_id;
    const responses = (c.responses as Array<{ id: string }>) || [];
    const activity = 1 + responses.length + (c.upvote_count || 0);
    const existing = activityMap.get(key);
    if (existing) {
      existing.score += activity;
    } else {
      activityMap.set(key, { score: activity, entity: c.company_entity });
    }
  });

  const topBrandsByActivity = Array.from(activityMap.entries())
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 5)
    .map(([entityId, data]) => ({
      company_entity_id: entityId,
      activity_score: data.score,
      company_entity: data.entity,
    }));

  return NextResponse.json(
    {
      topBrandsByIssues,
      topBrandsByActivity,
      period: '7d',
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    },
  );
}
