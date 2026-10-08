import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Database, 
  TrendingUp, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  FileCheck, 
  Zap, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { buildForensicReport } from '../data/forensicReports';

interface LandingPageProps {
  onLaunchTerminal: (ticker?: string) => void;
  onNavigateAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchTerminal,
  onNavigateAuth,
}) => {
  const [heroTicker, setHeroTicker] = useState<'AAPL' | 'NVDA' | 'TSLA'>('NVDA');
  const sampleReport = buildForensicReport(heroTicker);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top text kicker (NO pill wrapper) */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>SEC EDGAR XBRL Pipeline</span>
            <span className="text-slate-600">/</span>
            <span>30-Flag Forensic Screener</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Uncover balance sheet distortions before the market does.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            RedFlag Terminal parses audited SEC EDGAR 10-K filings, reconciles real-time Yahoo Finance market feeds, and applies 30 quantitative accounting invariants across FY22–FY26 to catch earnings manipulation.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onLaunchTerminal('NVDA')}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold rounded-lg shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Live Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateAuth}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Institutional Sign In</span>
            </button>
          </div>

          {/* Trust indicators as unboxed text */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span>100% Audited SEC 10-K Ingestion</span>
            <span className="text-slate-700">·</span>
            <span>FY22–FY26 Normalized Data</span>
            <span className="text-slate-700">·</span>
            <span>Sub-50ms Real-Time Reconciliation</span>
          </div>
        </div>

        {/* Interactive Live Hero Terminal Preview */}
        <div className="mt-14 max-w-5xl mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Terminal Window Chrome */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-xs font-mono text-slate-400">REDFLAG-FORENSIC-SCREENER // {heroTicker}</span>
            </div>

            {/* Interactive ticker selector in the preview */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs font-mono">
              <span className="text-slate-400 px-2 text-[11px]">Select Ticker:</span>
              {(['NVDA', 'AAPL', 'TSLA'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setHeroTicker(t)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    heroTicker === t 
                      ? 'bg-red-950 text-red-300 font-bold border border-red-800/80' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Quick Overview Bar */}
          <div className="p-5 border-b border-slate-800/80 bg-slate-900/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[11px]">ENTITY</span>
              <span className="text-white font-bold text-sm">{sampleReport.profile.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">LIVE PRICE & CAP</span>
              <span className="text-white font-bold text-sm">
                ${sampleReport.marketData.price} (${(sampleReport.marketData.marketCap).toFixed(0)}B)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">FORENSIC SCORE</span>
              <span className={`font-bold text-sm ${
                sampleReport.healthScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {sampleReport.healthScore} / 100 ({sampleReport.gatingPassed ? 'GATE PASS' : 'GATE FAIL'})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">FLAG BREAKDOWN</span>
              <span className="text-slate-200">
                <span className="text-rose-400 font-bold">{sampleReport.redCount} Red</span> ·{' '}
                <span className="text-amber-400 font-bold">{sampleReport.yellowCount} Yellow</span> ·{' '}
                <span className="text-emerald-400 font-bold">{sampleReport.greenCount} Green</span>
              </span>
            </div>
          </div>

          {/* Mini 4-Flag Highlight Grid */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950/40">
            {sampleReport.flags.slice(0, 4).map((flag) => (
              <div 
                key={flag.id} 
                className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-lg flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{flag.id}</span>
                    <span className="font-medium text-slate-100">{flag.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{flag.forensicAnalysis}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    flag.level === 'RED' 
                      ? 'bg-rose-950/80 text-rose-300 border-rose-800' 
                      : flag.level === 'YELLOW'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                  }`}>
                    {flag.level}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-400 mt-1">{flag.currentValue}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Bottom Action */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Auditor: {sampleReport.profile.auditor} · CIK {sampleReport.profile.cik}
            </span>
            <button
              onClick={() => onLaunchTerminal(heroTicker)}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Complete 30-Flag Audit Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Architecture Matrix */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Institutional Forensic Architecture
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              How RedFlag Terminal converts messy raw SEC disclosures into actionable investment invariants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">01. Automated SEC EDGAR XBRL Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects directly to the SEC EDGAR company index by CIK. Parses 10-K and 10-Q XBRL tags to extract verbatim financial statement line items and footnotes across FY22, FY23, FY24, FY25, and FY26.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Covers Item 7 MD&A, Item 8 Notes, Item 9A Controls
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">02. 30-Rule Quantitative Screening</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates 30 forensic accounting rules including Sloan balance sheet accruals, DSI inventory spikes, DSO customer collection deceleration, depreciation schedule slowdowns, and non-GAAP distortions.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Green, Yellow, and Red severity tiering
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">03. Gating [GATE] Invariant Enforcement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before computing composite health scores, strict binary Gating Invariants enforce non-negotiable red flags: Going Concern disclaimer, SOX 404(b) material internal control weaknesses, and credit covenant defaults.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Binary gating veto protects capital
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: RedFlag vs Standard Screeners */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Traditional Screeners Miss Critical Accounting Fraud
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Standard equity screeners focus on trailing P/E and stated revenue growth. RedFlag audits the economic reality.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 font-mono uppercase text-slate-400">
                  <th className="py-3 px-4">Forensic Capability</th>
                  <th className="py-3 px-4 text-slate-500">Traditional Finviz / Yahoo</th>
                  <th className="py-3 px-4 text-red-400 font-bold">RedFlag Terminal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                <tr>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">Sloan Balance Sheet Accrual Calculation</td>
                  <td className="py-3.5 px-4 text-slate-500">Not Computed</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">Automated Multi-Year Trend</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">Gating [GATE] Invariant Check (Going Concern)</td>
                  <td className="py-3.5 px-4 text-slate-500">None</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">Hard Binary Veto Filter</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">DSO & Contract Asset Decoupling</td>
                  <td className="py-3.5 px-4 text-slate-500">Ignored</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">Calculated against Revenue Velocity</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">Verbatim SEC EDGAR Accession Citations</td>
                  <td className="py-3.5 px-4 text-slate-500">Generic Link Only</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">Exact Item, Note & Accession #</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">Real-Time Market Quote Reconciler</td>
                  <td className="py-3.5 px-4 text-slate-400">Delayed or separate</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">Synchronized with 10-K Fundamentals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to audit corporate earnings?
          </h2>
          <p className="text-sm text-slate-400">
            Access institutional forensic screening for AAPL, MSFT, NVDA, GOOGL, WMT, TSLA, and more.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onLaunchTerminal('AAPL')}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-lg shadow-red-950/50 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
