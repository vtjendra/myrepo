import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

// Force dynamic to avoid build-time Supabase calls
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://claimit.id';

  const entries: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  for (const locale of routing.locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  // Dynamically load companies and rights if Supabase is configured
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const admin = createAdminClient();

    const { data: companies } = await admin
      .from('company_entities')
      .select('country_code, company:companies!inner(global_slug)')
      .eq('is_active', true);

    if (companies) {
      for (const row of companies) {
        const company = row.company as unknown as { global_slug: string };
        for (const locale of routing.locales) {
          entries.push({
            url: `${baseUrl}/${locale}/companies/${company.global_slug}/${row.country_code}`,
            changeFrequency: 'monthly',
            priority: 0.8,
          });
        }
      }
    }

    const { data: rights } = await admin
      .from('rights_cache')
      .select('country_code, industry, updated_at')
      .order('updated_at', { ascending: false });

    if (rights) {
      const seen = new Set<string>();
      for (const r of rights) {
        const key = `${r.country_code}-${r.industry}`;
        if (seen.has(key)) continue;
        seen.add(key);
        for (const locale of routing.locales) {
          entries.push({
            url: `${baseUrl}/${locale}/rights/${r.country_code}/${r.industry}`,
            lastModified: new Date(r.updated_at),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    }
  } catch {
    // Supabase not configured — return static entries only
  }

  return entries;
}
