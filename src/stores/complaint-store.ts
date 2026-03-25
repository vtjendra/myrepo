'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COUNTRY_REGISTRY } from '@/lib/constants';

interface ComplaintData {
  companyEntityId: string | null;
  companyName: string | null;
  companySlug: string | null;
  countryCode: string | null;
  issueCategory: string | null;
  issueSubcategory: string | null;
  whatHappened: string | null;
  whenOccurred: string | null;
  amountInvolved: number | null;
  currencyCode: string;
  desiredOutcome: string | null;
  evidenceUrls: string[];
  rightsCardText: string | null;
  draftComplaint: string | null;
  finalComplaint: string | null;
  isPublic: boolean;
  updatedAt: number;
}

interface ComplaintStore {
  complaints: Record<string, ComplaintData>;
  getComplaint: (key: string) => ComplaintData | null;
  setCompany: (key: string, data: { companyEntityId: string; companyName: string; companySlug: string; countryCode: string }) => void;
  setIssue: (key: string, category: string, subcategory: string | null) => void;
  setRights: (key: string, text: string) => void;
  setDetails: (key: string, details: Partial<ComplaintData>) => void;
  setDraft: (key: string, draft: string) => void;
  setFinal: (key: string, final_text: string) => void;
  setVisibility: (key: string, isPublic: boolean) => void;
  addEvidence: (key: string, url: string) => void;
  removeEvidence: (key: string, url: string) => void;
  clearComplaint: (key: string) => void;
}

const STALE_HOURS = 24;

function makeKey(slug: string, country: string): string {
  return `${slug}-${country}`;
}

const defaultComplaint: ComplaintData = {
  companyEntityId: null,
  companyName: null,
  companySlug: null,
  countryCode: null,
  issueCategory: null,
  issueSubcategory: null,
  whatHappened: null,
  whenOccurred: null,
  amountInvolved: null,
  currencyCode: 'USD',
  desiredOutcome: null,
  evidenceUrls: [],
  rightsCardText: null,
  draftComplaint: null,
  finalComplaint: null,
  isPublic: false,
  updatedAt: Date.now(),
};

export const useComplaintStore = create<ComplaintStore>()(
  persist(
    (set, get) => ({
      complaints: {},

      getComplaint: (key: string) => {
        const complaint = get().complaints[key];
        if (!complaint) return null;
        // Check staleness
        if (Date.now() - complaint.updatedAt > STALE_HOURS * 60 * 60 * 1000) {
          set((state) => {
            const next = { ...state.complaints };
            delete next[key];
            return { complaints: next };
          });
          return null;
        }
        return complaint;
      },

      setCompany: (key, data) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              ...data,
              currencyCode: COUNTRY_REGISTRY[data.countryCode]?.currency ?? 'USD',
              updatedAt: Date.now(),
            },
          },
        })),

      setIssue: (key, category, subcategory) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              issueCategory: category,
              issueSubcategory: subcategory,
              updatedAt: Date.now(),
            },
          },
        })),

      setRights: (key, text) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              rightsCardText: text,
              updatedAt: Date.now(),
            },
          },
        })),

      setDetails: (key, details) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              ...details,
              updatedAt: Date.now(),
            },
          },
        })),

      setDraft: (key, draft) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              draftComplaint: draft,
              updatedAt: Date.now(),
            },
          },
        })),

      setFinal: (key, final_text) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              finalComplaint: final_text,
              updatedAt: Date.now(),
            },
          },
        })),

      setVisibility: (key, isPublic) =>
        set((state) => ({
          complaints: {
            ...state.complaints,
            [key]: {
              ...(state.complaints[key] || defaultComplaint),
              isPublic,
              updatedAt: Date.now(),
            },
          },
        })),

      addEvidence: (key, url) =>
        set((state) => {
          const current = state.complaints[key] || defaultComplaint;
          return {
            complaints: {
              ...state.complaints,
              [key]: {
                ...current,
                evidenceUrls: [...current.evidenceUrls, url],
                updatedAt: Date.now(),
              },
            },
          };
        }),

      removeEvidence: (key, url) =>
        set((state) => {
          const current = state.complaints[key] || defaultComplaint;
          return {
            complaints: {
              ...state.complaints,
              [key]: {
                ...current,
                evidenceUrls: current.evidenceUrls.filter((u) => u !== url),
                updatedAt: Date.now(),
              },
            },
          };
        }),

      clearComplaint: (key) =>
        set((state) => {
          const next = { ...state.complaints };
          delete next[key];
          return { complaints: next };
        }),
    }),
    {
      name: 'claimit-complaints',
      partialize: (state) => ({ complaints: state.complaints }),
    },
  ),
);

export { makeKey };
export type { ComplaintData };
