'use client';

import { useTranslations } from 'next-intl';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = ['issue', 'rights', 'details', 'draft', 'send'] as const;

export function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  const t = useTranslations('common');

  return (
    <div className="mb-6">
      <p className="mb-3 text-center text-sm text-gray-500">
        {t('stepOf', { current: currentStep, total: totalSteps })}
      </p>
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentStep ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
