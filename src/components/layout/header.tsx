'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-app flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand-600">ClaimIt</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t('home')}
          </Link>
          <Link href={{ pathname: '/cases' }} className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t('myCases')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
