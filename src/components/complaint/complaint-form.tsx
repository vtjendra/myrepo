'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { complaintDetailsSchema, type ComplaintDetailsData } from '@/lib/validators/case';
import { useComplaintStore, makeKey } from '@/stores/complaint-store';
import { DESIRED_OUTCOMES, SUPPORTED_CURRENCIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface ComplaintFormProps {
  slug: string;
  country: string;
}

export function ComplaintForm({ slug, country }: ComplaintFormProps) {
  const t = useTranslations('complaintForm');
  const tc = useTranslations('common');
  const router = useRouter();
  const key = makeKey(slug, country);
  const { getComplaint, setDetails } = useComplaintStore();
  const complaint = getComplaint(key);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplaintDetailsData>({
    resolver: zodResolver(complaintDetailsSchema),
    defaultValues: {
      whatHappened: complaint?.whatHappened || '',
      whenOccurred: complaint?.whenOccurred || '',
      amountInvolved: complaint?.amountInvolved || undefined,
      currencyCode: complaint?.currencyCode || 'IDR',
      desiredOutcome: (complaint?.desiredOutcome as ComplaintDetailsData['desiredOutcome']) || undefined,
    },
  });

  useEffect(() => {
    if (!complaint?.issueCategory) {
      router.replace({ pathname: '/complain-about/[slug]/[country]', params: { slug, country } });
    }
  }, [complaint, router, slug, country]);

  function onSubmit(data: ComplaintDetailsData) {
    setDetails(key, {
      whatHappened: data.whatHappened,
      whenOccurred: data.whenOccurred,
      amountInvolved: data.amountInvolved,
      currencyCode: data.currencyCode,
      desiredOutcome: data.desiredOutcome,
    });
    router.push({ pathname: '/complain-about/[slug]/[country]/draft', params: { slug, country } });
  }

  const outcomeOptions = DESIRED_OUTCOMES.map((o) => ({
    value: o,
    label: t.has(`outcome_${o}` as 'whatHappened') ? t(`outcome_${o}` as 'whatHappened') : o.replace(/_/g, ' '),
  }));

  const currencyOptions = SUPPORTED_CURRENCIES.map((c) => ({
    value: c.code,
    label: `${c.code} (${c.symbol})`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Textarea
        label={t('whatHappened', { defaultMessage: 'What happened?' })}
        placeholder={t('whatHappenedPlaceholder', { defaultMessage: 'Describe the issue in detail...' })}
        error={errors.whatHappened?.message}
        rows={5}
        {...register('whatHappened')}
      />

      <Input
        label={t('whenOccurred', { defaultMessage: 'When did this happen?' })}
        type="date"
        error={errors.whenOccurred?.message}
        {...register('whenOccurred')}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label={t('currency', { defaultMessage: 'Currency' })}
          options={currencyOptions}
          {...register('currencyCode')}
        />
        <Input
          label={t('amountInvolved', { defaultMessage: 'Amount involved' })}
          type="number"
          placeholder="0"
          error={errors.amountInvolved?.message}
          {...register('amountInvolved', { valueAsNumber: true })}
        />
      </div>

      <Select
        label={t('desiredOutcome', { defaultMessage: 'What outcome do you want?' })}
        options={outcomeOptions}
        placeholder={t('selectOutcome', { defaultMessage: 'Select desired outcome' })}
        error={errors.desiredOutcome?.message}
        {...register('desiredOutcome')}
      />

      <div className="sticky bottom-16 bg-white py-3 md:bottom-0">
        <Button type="submit" fullWidth size="lg">
          {tc('next')}
        </Button>
      </div>
    </form>
  );
}
