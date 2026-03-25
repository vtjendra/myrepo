'use client';

type EventName =
  | 'complaint_started'
  | 'rights_viewed'
  | 'draft_generated'
  | 'complaint_sent'
  | 'upvote_toggled';

type EventProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, properties);
  }
}
