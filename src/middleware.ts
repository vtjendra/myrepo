import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createMiddlewareClient } from './lib/supabase/middleware';
import { rateLimit, getClientIp } from './lib/rate-limit';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. Rate limiting
  const ip = getClientIp(request);
  const { success } = rateLimit(`global:${ip}`, 100, 60 * 1000);
  if (!success) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // 2. Run intl middleware first to get the response with correct locale headers
  const response = intlMiddleware(request);

  // 3. Refresh Supabase auth tokens
  try {
    const supabase = createMiddlewareClient(request, response);
    await supabase.auth.getUser();
  } catch {
    // Auth refresh failed — continue without auth
  }

  return response;
}

export const config = {
  matcher: ['/', '/(id|en|zh|hi|ms|tl|vi|th)/:path*'],
};
