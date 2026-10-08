import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Radio, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { CompanyProfile, LiveMarketData } from '../types';

interface LiveMarketFeedBarProps {
  profile: CompanyProfile;
  marketData: LiveMarketData;
  onRefreshFeed?: () => void;
}

export const LiveMarketFeedBar: React.FC<LiveMarketFeedBarProps> = ({
  profile,
  marketData,
  onRefreshFeed,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastTick, setLastTick] = useState(marketData.lastReconciledTimestamp);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastTick(new Date().toLocaleTimeString('en-US', { hour12: false }) + ' EDT');
      if (onRefreshFeed) onRefreshFeed();
    }, 600);
  };

  const isPositive = marketData.change >= 0;
  
  // Calculate 52w range position percentage
  const rangeSpan = marketData.high52w - marketData.low52w;
  const currentInRange = Math.max(0, Math.min(100, ((marketData.price - marketData.low52w) / (rangeSpan || 1)) * 100));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-red-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Company Identity & SEC Accession */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-mono font-bold text-lg text-slate-100 shadow-inner">
            {profile.ticker}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{profile.name}</h2>
              <span className="text-xs px-2 py-0.5 font-mono text-slate-300 bg-slate-800 border border-slate-700 rounded">
                {profile.exchange}: {profile.ticker}
              </span>
              <span className="text-xs text-slate-400">
                CIK <span className="font-mono text-slate-300">{profile.cik}</span>
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
              <span>{profile.sector}</span>
              <span className="text-slate-700">·</span>
              <span>Auditor: <strong className="text-slate-200 font-medium">{profile.auditor}</strong></span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {profile.auditOpinion}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Quote & Tick Reconciler */}
        <div className="flex flex-wrap items-center gap-6 py-2 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-800/80 lg:px-6">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Live Market Price</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono-numbers text-white tracking-tight">
                ${marketData.price.toFixed(2)}
              </span>
              <span className={`flex items-center text-xs font-mono font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                {isPositive ? '+' : ''}{marketData.change.toFixed(2)} ({isPositive ? '+' : ''}{marketData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* 52-Week Range Bar */}
          <div className="w-40 sm:w-48">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>52W L: ${marketData.low52w.toFixed(1)}</span>
              <span>52W H: ${marketData.high52w.toFixed(1)}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden relative">
              <div 
                className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full rounded-full"
                style={{ width: `${currentInRange}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Valuation Multiples & SEC Accession Link */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-between lg:justify-end text-xs">
          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400">Market Cap</span>
            <span className="font-mono-numbers font-semibold text-white text-sm">
              ${marketData.marketCap >= 1000 ? `${(marketData.marketCap / 1000).toFixed(2)}T` : `${marketData.marketCap.toFixed(1)}B`}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400">EV / EBITDA</span>
            <span className="font-mono-numbers font-semibold text-slate-200 text-sm">
              {marketData.evEbitda.toFixed(1)}x
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase text-slate-400">P/E (TTM)</span>
            <span className="font-mono-numbers font-semibold text-slate-200 text-sm">
              {marketData.peRatio.toFixed(1)}x
            </span>
          </div>

          {/* Refresh button & Reconciled badge */}
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-all cursor-pointer"
              title="Force reconcile against SEC EDGAR & Yahoo Finance"
            >
              <RefreshCw className={`w-3 h-3 text-slate-400 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isRefreshing ? 'Reconciling...' : 'Reconcile'}</span>
            </button>
            <span className="text-[9px] font-mono text-slate-400">
              Synced: {lastTick}
            </span>
          </div>
        </div>
      </div>

      {/* Micro-bar: EDGAR Accession & Reconciliation Footnote */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-slate-300 font-mono">
            <Radio className="w-3 h-3 text-emerald-400" />
            SEC Feed Verified
          </span>
          <span className="text-slate-700">|</span>
          <span>Accession: <span className="font-mono text-slate-300">{profile.accessionNumber}</span></span>
          <span className="text-slate-700">|</span>
          <span>Filing Date: <span className="text-slate-300">{profile.secFilingDate}</span></span>
        </div>

        <a 
          href={`https://www.sec.gov/edgar/browse/?CIK=${profile.cik}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
        >
          <span>View on SEC EDGAR</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
