'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

const localeNames: Record<string, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  ms: 'Bahasa Melayu',
  tl: 'Tagalog',
  vi: 'Tiếng Việt',
  th: 'ไทย',
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    // Replace the locale segment in the pathname
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      aria-label="Select language"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc] || loc}
        </option>
      ))}
    </select>
  );
}
