import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { addCompanySchema } from '@/lib/validators/company';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`add-company:${ip}`, 3, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Verify user is authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = addCompanySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.canonicalName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Use admin client since RLS restricts INSERT on companies
  const admin = createAdminClient();

  const { data: company, error: companyError } = await admin
    .from('companies')
    .insert({
      canonical_name: data.canonicalName,
      global_slug: slug,
      website: data.website || null,
      industry: data.industry,
      is_active: false, // pending review
    })
    .select('id')
    .single();

  if (companyError) {
    if (companyError.code === '23505') {
      return NextResponse.json({ error: 'Company already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }

  await admin.from('company_entities').insert({
    company_id: company.id,
    country_code: data.countryCode.toUpperCase(),
    local_name: data.localName || data.canonicalName,
    complaint_email: data.complaintEmail || null,
    is_active: false,
  });

  return NextResponse.json({ id: company.id, slug }, { status: 201 });
}
