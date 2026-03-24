import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('common');

  return (
    <div className="container-app flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-xl font-bold text-gray-900">
        {t('notFoundTitle', { defaultMessage: 'Page not found' })}
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        {t('notFoundDescription', { defaultMessage: "The page you're looking for doesn't exist or has been moved." })}
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        {t('backToHome', { defaultMessage: 'Back to home' })}
      </Link>
    </div>
  );
}
