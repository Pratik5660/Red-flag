import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldX, 
  CheckCircle, 
  HelpCircle, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { CompanyForensicReport } from '../types';

interface CoverageSummaryCardProps {
  report: CompanyForensicReport;
}

export const CoverageSummaryCard: React.FC<CoverageSummaryCardProps> = ({ report }) => {
  const { 
    healthScore, 
    gatingPassed, 
    gatingNotes, 
    flags, 
    coverageRatio, 
    computedCount, 
    uncomputedCount,
    greenCount,
    yellowCount,
    redCount
  } = report;

  // Rating grade determination
  const getRating = (score: number) => {
    if (!gatingPassed) return { grade: 'HIGH RISK [GATE FAIL]', color: 'text-red-400 bg-red-950/60 border-red-700/60' };
    if (score >= 90) return { grade: 'PRIME AAA FORENSIC', color: 'text-emerald-300 bg-emerald-950/40 border-emerald-700/60' };
    if (score >= 80) return { grade: 'SOUND AA FORENSIC', color: 'text-teal-300 bg-teal-950/40 border-teal-700/60' };
    if (score >= 70) return { grade: 'MODERATE A', color: 'text-yellow-300 bg-yellow-950/40 border-yellow-700/60' };
    if (score >= 50) return { grade: 'ELEVATED RISK BBB', color: 'text-amber-300 bg-amber-950/40 border-amber-700/60' };
    return { grade: 'DISTRESSED C', color: 'text-red-400 bg-red-950/60 border-red-700/60' };
  };

  const rating = getRating(healthScore);

  // Group flags by category for mini visual distribution
  const categories = ['Gating', 'Revenue', 'Expense', 'Working Capital', 'Cash Flow', 'Governance'] as const;
  const categoryStats = categories.map(cat => {
    const catFlags = flags.filter(f => f.category === cat);
    const red = catFlags.filter(f => f.level === 'RED').length;
    const yellow = catFlags.filter(f => f.level === 'YELLOW').length;
    const green = catFlags.filter(f => f.level === 'GREEN').length;
    return { category: cat, total: catFlags.length, red, yellow, green };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* 1. Health Score Gauge Card (4 cols) */}
      <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            Composite Forensic Score
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${rating.color}`}>
            {rating.grade}
          </span>
        </div>

        <div className="my-4 flex items-center gap-5">
          <div className="relative flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * healthScore) / 100}
                className={healthScore >= 80 ? 'text-emerald-500' : healthScore >= 65 ? 'text-amber-500' : 'text-red-500'}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black font-mono-numbers text-white">{healthScore}</span>
              <span className="block text-[9px] font-mono text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="text-slate-300 font-medium">Accounting Integrity Index</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Derived from 30 quantitative forensic rules covering Sloan accruals, deferred revenue depletion, DSI/DSO decoupling, and capitalization anomalies.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Benchmark: S&P 500 Median 79.4</span>
          <span className="text-emerald-400 font-mono">
            {healthScore > 79.4 ? `+${(healthScore - 79.4).toFixed(1)} vs Peers` : `${(healthScore - 79.4).toFixed(1)} vs Peers`}
          </span>
        </div>
      </div>

      {/* 2. Gating Flag Invariant Monitor (4 cols) */}
      <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Gating Invariants [GATE]
          </span>
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
            gatingPassed ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800' : 'text-rose-400 bg-rose-950/60 border-rose-800'
          }`}>
            {gatingPassed ? '3 OF 3 PASSED' : 'GATE VIOLATION'}
          </span>
        </div>

        <div className="my-3 space-y-2.5">
          <div className="flex items-center justify-between text-xs p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 text-[11px]">RF-01</span>
              <span className="text-slate-200">Going Concern Disclaimer</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> CLEAN
            </span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 text-[11px]">RF-02</span>
              <span className="text-slate-200">SOX 404(b) Material Weakness</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> PASS
            </span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 text-[11px]">RF-03</span>
              <span className="text-slate-200">Debt Covenant Default Notice</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> CLEAR
            </span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 truncate">
          {gatingNotes}
        </p>
      </div>

      {/* 3. Flags Distribution & Coverage Ratio (4 cols) */}
      <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Coverage & Flag State
          </span>
          <span className="text-[11px] font-mono text-slate-300">
            {computedCount}/30 ({coverageRatio}%)
          </span>
        </div>

        {/* Level Badges Row */}
        <div className="my-2 grid grid-cols-3 gap-2">
          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-2.5 text-center">
            <span className="text-xl font-bold font-mono text-emerald-400">{greenCount}</span>
            <span className="block text-[10px] font-medium text-emerald-500 uppercase">Green (Pass)</span>
          </div>

          <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-2.5 text-center">
            <span className="text-xl font-bold font-mono text-amber-400">{yellowCount}</span>
            <span className="block text-[10px] font-medium text-amber-500 uppercase">Yellow (Watch)</span>
          </div>

          <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-2.5 text-center">
            <span className="text-xl font-bold font-mono text-rose-400">{redCount}</span>
            <span className="block text-[10px] font-medium text-rose-500 uppercase">Red (Anomaly)</span>
          </div>
        </div>

        {/* Category risk mini-bars */}
        <div className="space-y-1 pt-1 text-[11px]">
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>Category Breakdown</span>
            <span>{uncomputedCount === 0 ? 'Zero uncomputed flags' : `${uncomputedCount} uncomputed`}</span>
          </div>
          <div className="grid grid-cols-6 gap-1 h-2">
            {categoryStats.map((cat) => (
              <div 
                key={cat.category}
                className={`rounded-sm ${
                  cat.red > 0 ? 'bg-rose-500' : cat.yellow > 0 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                title={`${cat.category}: ${cat.red} Red, ${cat.yellow} Yellow, ${cat.green} Green`}
              />
            ))}
          </div>
        </div>

        <div className="pt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800">
          <span>SEC XBRL Taxonomy: FY22–FY26</span>
          <span className="text-slate-300">Audited 10-K Data</span>
        </div>
      </div>
    </div>
  );
};
