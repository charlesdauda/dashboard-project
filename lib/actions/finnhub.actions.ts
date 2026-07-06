import 'server-only';

// Finnhub API wrapper used by Inngest daily news summary.
// This file was previously empty which broke imports.



/**
 * Finnhub/news fetching.
 *
 * Note: `lib/utils.ts` does not currently export a real Finnhub client.
 * This implementation avoids breaking builds by returning safe empty results
 * (Inngest already falls back to `getNews()` when symbol-specific results are empty).
 */
export const getNews = async (_symbols?: string[]) => {
  try {
    // TODO: wire to a real Finnhub fetcher when available.
    void _symbols;
    return [] as MarketNewsArticle[];
  } catch (e) {
    console.error('getNews failed:', e);
    return [] as MarketNewsArticle[];
  }
};


