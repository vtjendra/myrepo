import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Handles OAuth redirects from Google / Facebook.
// Supabase redirects here with ?code=... after the user authenticates.
// We exchange the code for a session, then redirect back to the original page.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed — redirect to home with an error param the page can surface
  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
