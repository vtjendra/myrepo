import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateFileMagicBytes } from '@/lib/validators/upload';
import { MAX_EVIDENCE_SIZE_BYTES } from '@/lib/constants';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`upload:${ip}`, 10, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > MAX_EVIDENCE_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
  }

  // Validate magic bytes
  const buffer = await file.arrayBuffer();
  const { valid, detectedType } = await validateFileMagicBytes(buffer);

  if (!valid) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const ext = detectedType === 'image/jpeg' ? 'jpg' : detectedType === 'image/png' ? 'png' : 'pdf';
  const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('evidence')
    .upload(fileName, buffer, { contentType: detectedType! });

  if (uploadError) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: urlData } = await supabase.storage
    .from('evidence')
    .createSignedUrl(fileName, 3600);

  return NextResponse.json({ url: urlData?.signedUrl, path: fileName });
}
