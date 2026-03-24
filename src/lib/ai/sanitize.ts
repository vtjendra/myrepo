const MAX_INPUT_LENGTH = 5000;

export function sanitizeInput(input: string): string {
  // Strip HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Remove potential prompt injection patterns
  sanitized = sanitized.replace(/\b(ignore|disregard|forget)\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|rules?)/gi, '');

  // Trim to max length
  if (sanitized.length > MAX_INPUT_LENGTH) {
    sanitized = sanitized.slice(0, MAX_INPUT_LENGTH);
  }

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  return sanitized;
}

export function validateLocale(locale: string): boolean {
  const validLocales = ['id', 'en', 'zh', 'hi', 'ms', 'tl', 'vi', 'th'];
  return validLocales.includes(locale);
}
