import React from 'react';
import { 
  X, 
  ShieldAlert, 
  ExternalLink, 
  FileText, 
  Calculator, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ForensicFlag, FlagLevel } from '../types';

interface FlagDetailDrawerProps {
  flag: ForensicFlag | null;
  onClose: () => void;
  cik: string;
}

export const FlagDetailDrawer: React.FC<FlagDetailDrawerProps> = ({ flag, onClose, cik }) => {
  if (!flag) return null;

  const isRed = flag.level === 'RED';
  const isYellow = flag.level === 'YELLOW';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div 
        className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {flag.id}
                </span>
                {flag.isGating && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-700">
                    GATING INVARIANT [GATE]
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">
                  {flag.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {flag.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Evaluation Banner */}
          <div className={`mt-4 p-3 rounded-lg border flex items-center justify-between ${
            isRed 
              ? 'bg-rose-950/40 border-rose-800/80 text-rose-300' 
              : isYellow 
              ? 'bg-amber-950/40 border-amber-800/80 text-amber-300' 
              : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
          }`}>
            <div className="flex items-center gap-2.5">
              {isRed ? (
                <XCircle className="w-5 h-5 text-rose-400" />
              ) : isYellow ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              )}
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Assigned Screening Level</span>
                <span className="text-sm font-bold font-mono">
                  {flag.level === 'RED' ? 'RED (Forensic Anomaly Detected)' : flag.level === 'YELLOW' ? 'YELLOW (Elevated Variance)' : 'GREEN (Verified Invariant)'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Reading</span>
              <span className="text-sm font-bold font-mono text-white">{flag.currentValue}</span>
            </div>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* 1. Quantitative Formula */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              Quantitative Screening Formula
            </h4>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-blue-300">
              <code>{flag.formula}</code>
            </div>
          </div>

          {/* 2. Threshold Matrix */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Evaluation Thresholds & Decision Logic
            </h4>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              {flag.threshold}
            </div>
          </div>

          {/* 3. Multi-Year Historical Trajectory (FY22 - FY26) */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Multi-Year Progression (FY22–FY26)
            </h4>
            <div className="grid grid-cols-5 gap-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-center font-mono">
              {(['FY22', 'FY23', 'FY24', 'FY25', 'FY26'] as const).map((fy) => (
                <div key={fy} className="p-2 bg-slate-900/80 rounded border border-slate-800/60">
                  <span className="block text-[10px] text-slate-400">{fy}</span>
                  <span className="text-xs font-bold text-white mt-0.5 block truncate">
                    {String(flag.historicalValues[fy])}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Forensic Auditor Commentary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Forensic Auditor Synthesis & Risk Assessment
            </h4>
            <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
              <p>{flag.forensicAnalysis}</p>
              <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Risk Severity Weight: <strong>{flag.riskWeight}/10</strong></span>
                <span>Trend: <strong className="capitalize text-slate-300">{flag.trend}</strong></span>
              </div>
            </div>
          </div>

          {/* 5. Verbatim SEC Citation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              SEC EDGAR Filing Citation
            </h4>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono break-all flex items-start justify-between gap-3">
              <div>
                <p className="text-slate-300 font-medium">{flag.citation}</p>
                <p className="text-[11px] text-slate-400 mt-1">XBRL Tag & Disclosure Section: {flag.secItem}</p>
              </div>
              <a
                href={`https://www.sec.gov/edgar/browse/?CIK=${cik}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 transition-colors"
                title="View on SEC EDGAR"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            RedFlag Invariant Engine v4.2
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
