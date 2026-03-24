'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { CompanyCard } from './company-card';

interface SearchResult {
  id: string;
  canonical_name: string;
  global_slug: string;
  industry: string;
  logo_url: string | null;
  entity: {
    id: string;
    local_name: string;
    country_code: string;
  };
}

export function CompanySearch() {
  const t = useTranslations('home');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    setSearchError(false);
    try {
      const res = await fetch(`/api/companies/search?q=${encodeURIComponent(q)}&country=ID`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch {
      setResults([]);
      setSearchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(result: SearchResult) {
    setShowResults(false);
    router.push({ pathname: '/complain-about/[slug]/[country]', params: { slug: result.global_slug, country: result.entity.country_code } });
  }

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full max-w-xl">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-10 pr-4 text-base shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          autoComplete="off"
        />
        {loading && (
          <svg className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </div>

      {showResults && query.length >= 2 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {searchError ? (
            <p className="p-4 text-center text-sm text-red-600">{t('searchError', { defaultMessage: 'Search is temporarily unavailable. Please try again.' })}</p>
          ) : results.length === 0 && !loading ? (
            <p className="p-4 text-center text-sm text-gray-500">{t('searchNoResults')}</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <CompanyCard company={result} compact />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
