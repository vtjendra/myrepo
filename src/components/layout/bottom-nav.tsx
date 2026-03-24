'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isCases = pathname.startsWith('/cases');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white md:hidden">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs tap-target ${isHome ? 'text-brand-600' : 'text-gray-500'}`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
          </svg>
          <span>{t('home')}</span>
        </Link>

        <Link
          href={{ pathname: '/cases' }}
          className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs tap-target ${isCases ? 'text-brand-600' : 'text-gray-500'}`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>{t('myCases')}</span>
        </Link>

        <Link
          href={{ pathname: '/cases' }} // TODO: Create dedicated /account page
          className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs tap-target text-gray-500`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{t('account')}</span>
        </Link>
      </div>
    </nav>
  );
}
