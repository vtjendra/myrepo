import { z } from 'zod';
import { DESIRED_OUTCOMES } from '@/lib/constants';

export const issueSelectorSchema = z.object({
  issueCategory: z.string().min(1, 'Issue category is required'),
  issueSubcategory: z.string().nullable(),
});

export const complaintDetailsSchema = z.object({
  whatHappened: z
    .string()
    .min(50, 'Please describe what happened in at least 50 characters')
    .max(2000, 'Description must be 2000 characters or less'),
  whenOccurred: z.string().nullable(),
  amountInvolved: z.number().positive().nullable(),
  currencyCode: z.string().length(3),
  desiredOutcome: z.enum(DESIRED_OUTCOMES),
});

export const createCaseSchema = z.object({
  companyEntityId: z.string().uuid(),
  issueCategory: z.string().min(1),
  issueSubcategory: z.string().nullable(),
  whatHappened: z.string().min(50).max(2000),
  whenOccurred: z.string().nullable(),
  amountInvolved: z.number().positive().nullable(),
  currencyCode: z.string().length(3),
  desiredOutcome: z.enum(DESIRED_OUTCOMES),
  draftComplaint: z.string().min(1),
  finalComplaint: z.string().min(1),
});

export type IssueSelectorData = z.infer<typeof issueSelectorSchema>;
export type ComplaintDetailsData = z.infer<typeof complaintDetailsSchema>;
export type CreateCaseData = z.infer<typeof createCaseSchema>;
