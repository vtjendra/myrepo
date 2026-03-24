import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="container-app text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ClaimIt. {t('allRightsReserved', { defaultMessage: 'All rights reserved.' })}
        </p>
      </div>
    </footer>
  );
}
