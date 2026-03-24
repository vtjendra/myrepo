'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';

interface VisibilityToggleProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export function VisibilityToggle({ isPublic, onChange }: VisibilityToggleProps) {
  const t = useTranslations('send');

  return (
    <Card>
      <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">
        {t('visibilityTitle', { defaultMessage: 'Complaint visibility' })}
      </h3>
      <div className="space-y-3">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors ${
            isPublic
              ? 'border-brand-600 bg-brand-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="visibility"
            checked={isPublic}
            onChange={() => onChange(true)}
            className="mt-0.5 h-4 w-4 text-brand-600"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              {t('visibilityPublic', { defaultMessage: 'Public' })}
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              {t('visibilityRecommended', { defaultMessage: 'Recommended' })}
            </span>
            <p className="mt-1 text-xs text-gray-500">
              {t('visibilityPublicDesc', {
                defaultMessage:
                  'Public complaints get resolved faster. Others can upvote to add pressure and raise awareness.',
              })}
            </p>
          </div>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors ${
            !isPublic
              ? 'border-brand-600 bg-brand-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="visibility"
            checked={!isPublic}
            onChange={() => onChange(false)}
            className="mt-0.5 h-4 w-4 text-brand-600"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              {t('visibilityPrivate', { defaultMessage: 'Private' })}
            </span>
            <p className="mt-1 text-xs text-gray-500">
              {t('visibilityPrivateDesc', {
                defaultMessage:
                  'Only you and the company can see this complaint. Your personal details are always protected.',
              })}
            </p>
          </div>
        </label>
      </div>
    </Card>
  );
}
