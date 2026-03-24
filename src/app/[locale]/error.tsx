'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  return (
    <div className="container-app flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-xl font-bold text-gray-900">
        {t('errorTitle', { defaultMessage: 'Something went wrong' })}
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        {t('errorDescription', { defaultMessage: 'An unexpected error occurred. Please try again.' })}
      </p>
      <Button onClick={reset}>
        {t('retry', { defaultMessage: 'Try again' })}
      </Button>
    </div>
  );
}
