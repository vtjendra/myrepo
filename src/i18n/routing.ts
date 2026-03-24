import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en', 'zh', 'hi', 'ms', 'tl', 'vi', 'th'],
  defaultLocale: 'id',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/complain-about/[slug]/[country]': {
      id: '/komplain-tentang/[slug]/[country]',
      en: '/complain-about/[slug]/[country]',
      zh: '/complain-about/[slug]/[country]',
      hi: '/complain-about/[slug]/[country]',
      ms: '/complain-about/[slug]/[country]',
      tl: '/complain-about/[slug]/[country]',
      vi: '/complain-about/[slug]/[country]',
      th: '/complain-about/[slug]/[country]',
    },
    '/complain-about/[slug]/[country]/rights': '/complain-about/[slug]/[country]/rights',
    '/complain-about/[slug]/[country]/details': '/complain-about/[slug]/[country]/details',
    '/complain-about/[slug]/[country]/draft': '/complain-about/[slug]/[country]/draft',
    '/complain-about/[slug]/[country]/send': '/complain-about/[slug]/[country]/send',
    '/cases': '/cases',
    '/cases/[uuid]': '/cases/[uuid]',
    '/companies/add': '/companies/add',
    '/companies/[slug]/[country]': '/companies/[slug]/[country]',
    '/rights/[country]/[industry]': '/rights/[country]/[industry]',
  },
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
