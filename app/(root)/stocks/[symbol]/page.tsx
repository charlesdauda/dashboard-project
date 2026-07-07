import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function StockDetails({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const symbolUpper = symbol.toUpperCase();

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-6">
      {/* LEFT COLUMN */}
      <section className="flex flex-col gap-6">
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
          config={SYMBOL_INFO_WIDGET_CONFIG(symbolUpper)}
          height={170}
        />
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          config={CANDLE_CHART_WIDGET_CONFIG(symbolUpper)}
          height={600}
        />
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          config={BASELINE_WIDGET_CONFIG(symbolUpper)}
          height={600}
        />
      </section>

      {/* RIGHT COLUMN */}
      <section className="flex flex-col gap-6">
        <WatchlistButton symbol={symbolUpper} company={symbolUpper} isInWatchlist={false} />

        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbolUpper)}
          height={425}
        />
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbolUpper)}
          height={440}
        />
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbolUpper)}
          height={464}
        />
      </section>
    </div>
  );
}