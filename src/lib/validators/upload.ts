import { ALLOWED_EVIDENCE_TYPES, MAX_EVIDENCE_SIZE_BYTES, MAX_EVIDENCE_FILES } from '@/lib/constants';

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_EVIDENCE_TYPES.includes(file.type as (typeof ALLOWED_EVIDENCE_TYPES)[number])) {
    return { valid: false, error: `File type "${file.type}" is not allowed. Accepted: JPEG, PNG, PDF.` };
  }

  if (file.size > MAX_EVIDENCE_SIZE_BYTES) {
    return { valid: false, error: `File size exceeds 5MB limit.` };
  }

  return { valid: true };
}

export function validateFileCount(currentCount: number): { valid: boolean; error?: string } {
  if (currentCount >= MAX_EVIDENCE_FILES) {
    return { valid: false, error: `Maximum ${MAX_EVIDENCE_FILES} files allowed.` };
  }
  return { valid: true };
}

// Check file magic bytes server-side
export async function validateFileMagicBytes(buffer: ArrayBuffer): Promise<{ valid: boolean; detectedType: string | null }> {
  const bytes = new Uint8Array(buffer.slice(0, 8));

  // JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return { valid: true, detectedType: 'image/jpeg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return { valid: true, detectedType: 'image/png' };
  }

  // PDF: 25 50 44 46 (%PDF)
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return { valid: true, detectedType: 'application/pdf' };
  }

  return { valid: false, detectedType: null };
}
