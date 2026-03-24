import { z } from 'zod';

export const addCompanySchema = z.object({
  canonicalName: z.string().min(2, 'Company name must be at least 2 characters').max(200),
  website: z.string().url('Please enter a valid URL').or(z.literal('')).nullable(),
  industry: z.string().min(1, 'Industry is required'),
  countryCode: z.string().length(2, 'Country code must be 2 characters'),
  localName: z.string().min(2).max(200).nullable(),
  complaintEmail: z.string().email('Please enter a valid email').or(z.literal('')).nullable(),
});

export type AddCompanyData = z.infer<typeof addCompanySchema>;
