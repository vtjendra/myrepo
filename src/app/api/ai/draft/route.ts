import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getAnthropicClient } from '@/lib/ai/client';
import { getComplaintDraftPrompt } from '@/lib/ai/prompts';
import { sanitizeInput, validateLocale } from '@/lib/ai/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const requestSchema = z.object({
  company_name: z.string().min(1),
  issue_category: z.string().min(1),
  issue_subcategory: z.string().nullable(),
  what_happened: z.string().min(1),
  when_occurred: z.string().nullable(),
  amount_involved: z.number().nullable(),
  currency_code: z.string().default('IDR'),
  desired_outcome: z.string().min(1),
  rights_text: z.string().nullable(),
  locale: z.string().min(2).max(5),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`ai-draft:${ip}`, 3, 60 * 1000);
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  const body = await request.json();
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response('Invalid request', { status: 400 });
  }

  const data = parsed.data;
  if (!validateLocale(data.locale)) {
    return new Response('Invalid locale', { status: 400 });
  }

  const prompt = getComplaintDraftPrompt({
    company_name: sanitizeInput(data.company_name),
    issue_category: sanitizeInput(data.issue_category),
    issue_subcategory: data.issue_subcategory ? sanitizeInput(data.issue_subcategory) : null,
    what_happened: sanitizeInput(data.what_happened),
    when_occurred: data.when_occurred,
    amount_involved: data.amount_involved,
    currency_code: data.currency_code,
    desired_outcome: sanitizeInput(data.desired_outcome),
    rights_text: data.rights_text ? sanitizeInput(data.rights_text) : null,
    locale: data.locale,
  });

  const anthropic = getAnthropicClient();

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
