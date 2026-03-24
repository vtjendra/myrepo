import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAnthropicClient } from '@/lib/ai/client';
import { getRightsBriefingPrompt } from '@/lib/ai/prompts';
import { sanitizeInput, validateLocale } from '@/lib/ai/sanitize';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const requestSchema = z.object({
  country_code: z.string().length(2),
  industry: z.string().min(1),
  issue_category: z.string().min(1),
  locale: z.string().min(2).max(5),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`ai-rights:${ip}`, 5, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { country_code, industry, issue_category, locale } = parsed.data;

  if (!validateLocale(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  // Check cache first
  const admin = createAdminClient();
  const { data: cached } = await admin
    .from('rights_cache')
    .select('content')
    .eq('country_code', country_code)
    .eq('industry', industry)
    .eq('issue_category', issue_category)
    .eq('locale', locale)
    .single();

  if (cached) {
    return NextResponse.json({ content: cached.content });
  }

  // Generate with Claude
  const anthropic = getAnthropicClient();
  const prompt = getRightsBriefingPrompt({
    country_code: sanitizeInput(country_code),
    industry: sanitizeInput(industry),
    issue_category: sanitizeInput(issue_category),
    locale,
  });

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0].type === 'text' ? message.content[0].text : '';

  // Cache the result
  await admin.from('rights_cache').upsert({
    country_code,
    industry,
    issue_category,
    locale,
    content,
  });

  return NextResponse.json({ content });
}
