import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`search:${ip}`, 30, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const country = searchParams.get('country') || 'ID';

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const supabase = await createClient();
  const pattern = `%${query}%`;

  const { data, error } = await supabase
    .from('company_entities')
    .select(`
      id,
      local_name,
      country_code,
      company:companies!inner (
        id,
        canonical_name,
        global_slug,
        industry,
        logo_url
      )
    `)
    .eq('country_code', country)
    .eq('is_active', true)
    .or(`local_name.ilike.${pattern},company.canonical_name.ilike.${pattern}`)
    .limit(10);

  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  // Reshape for frontend
  const results = (data || []).map((row: Record<string, unknown>) => {
    const company = row.company as Record<string, unknown>;
    return {
      id: company.id,
      canonical_name: company.canonical_name,
      global_slug: company.global_slug,
      industry: company.industry,
      logo_url: company.logo_url,
      entity: {
        id: row.id,
        local_name: row.local_name,
        country_code: row.country_code,
      },
    };
  });

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
