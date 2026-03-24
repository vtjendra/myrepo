'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { addCompanySchema, type AddCompanyData } from '@/lib/validators/company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const industryOptions = [
  'telecommunications', 'banking', 'insurance', 'airline', 'ecommerce',
  'utilities', 'government', 'healthcare', 'education', 'transportation',
  'food_beverage', 'technology', 'other',
].map((i) => ({ value: i, label: i.replace(/_/g, ' ') }));

export default function AddCompanyPage() {
  const t = useTranslations('companies');
  const tc = useTranslations('common');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCompanyData>({
    resolver: zodResolver(addCompanySchema),
    defaultValues: {
      countryCode: 'ID',
    },
  });

  async function onSubmit(data: AddCompanyData) {
    setError(null);
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (submitted) {
    return (
      <div className="container-app max-w-lg py-12 text-center">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900">
            {t('addSuccess', { defaultMessage: 'Company submitted for review!' })}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('addSuccessDesc', { defaultMessage: 'We will review and add it shortly.' })}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-app max-w-lg py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {t('addTitle', { defaultMessage: 'Add a Company' })}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t('companyName', { defaultMessage: 'Company Name' })}
          error={errors.canonicalName?.message}
          {...register('canonicalName')}
        />

        <Input
          label={t('localName', { defaultMessage: 'Local Name (optional)' })}
          error={errors.localName?.message}
          {...register('localName')}
        />

        <Input
          label={t('website', { defaultMessage: 'Website' })}
          placeholder="https://"
          error={errors.website?.message}
          {...register('website')}
        />

        <Select
          label={t('industry', { defaultMessage: 'Industry' })}
          options={industryOptions}
          placeholder={t('selectIndustry', { defaultMessage: 'Select industry' })}
          error={errors.industry?.message}
          {...register('industry')}
        />

        <Input
          label={t('countryCode', { defaultMessage: 'Country Code' })}
          maxLength={2}
          placeholder="ID"
          error={errors.countryCode?.message}
          {...register('countryCode')}
        />

        <Input
          label={t('complaintEmail', { defaultMessage: 'Complaint Email (optional)' })}
          type="email"
          error={errors.complaintEmail?.message}
          {...register('complaintEmail')}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" loading={isSubmitting} fullWidth size="lg">
          {tc('submit')}
        </Button>
      </form>
    </div>
  );
}
