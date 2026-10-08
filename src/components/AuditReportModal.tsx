import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { CompanyForensicReport } from '../types';

interface AuditReportModalProps {
  report: CompanyForensicReport;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({ report, onClose }) => {
  const { profile, marketData, healthScore, gatingPassed, flags } = report;

  const handlePrint = () => {
    window.print();
  };

  const flaggedItems = flags.filter(f => f.level === 'RED' || f.level === 'YELLOW');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div 
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-red-400" />
            <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Forensic Executive Memorandum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Memorandum Document */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200 font-sans text-xs bg-slate-900 printable-memo">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-red-400 uppercase tracking-widest font-semibold">
                CONFIDENTIAL INSTITUTIONAL AUDIT DOSSIER
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                {profile.name} ({profile.ticker})
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                SEC EDGAR CIK {profile.cik} · Accession {profile.accessionNumber}
              </p>
            </div>

            <div className="text-right font-mono text-xs">
              <div className="text-slate-400">Date of Invariant Run: <span className="text-white">October 2026</span></div>
              <div className="text-slate-400">Auditor of Record: <span className="text-white">{profile.auditor}</span></div>
              <div className="text-slate-400">Composite Health Score: <span className="text-emerald-400 font-bold text-sm">{healthScore}/100</span></div>
            </div>
          </div>

          {/* Gating Status Banner */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase">Gating Invariant Verification</span>
              <p className="font-medium text-slate-200 text-sm mt-0.5">
                {gatingPassed ? 'Passed (All 3 Gating Invariants Cleared)' : 'CRITICAL FAILURE: Gating Invariant Breached'}
              </p>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
              gatingPassed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
            }`}>
              {gatingPassed ? 'PASS' : 'FAIL'}
            </span>
          </div>

          {/* Key Audit Matters */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Independent Auditor Key Audit Matters (KAMs)
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 p-4 bg-slate-950/70 rounded-lg border border-slate-800/80">
              {profile.keyAuditMatters.map((kam, i) => (
                <li key={i} className="text-xs">
                  <span className="text-slate-300">{kam}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Triggered Forensic Flags */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Identified Forensic Flags & Variances ({flaggedItems.length})</span>
              <span className="text-[11px] text-slate-400 font-normal">Screened across 30 quantitative invariants</span>
            </h3>

            {flaggedItems.length === 0 ? (
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400 text-center font-mono">
                Clean Audit: Zero Red or Yellow flags detected in FY22-FY26 filings.
              </div>
            ) : (
              <div className="space-y-2.5">
                {flaggedItems.map((flag) => (
                  <div 
                    key={flag.id}
                    className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-300">{flag.id}</span>
                        <span className="font-semibold text-slate-100">{flag.name}</span>
                        <span className="text-slate-500 font-mono text-[10px]">({flag.category})</span>
                      </div>
                      <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                        {flag.forensicAnalysis}
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono mt-2">
                        SEC Citation: {flag.citation}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        flag.level === 'RED' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {flag.level}
                      </span>
                      <span className="block text-[11px] font-mono text-slate-300 mt-1 font-semibold">
                        {flag.currentValue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal disclaimer */}
          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 font-mono leading-relaxed">
            Memorandum prepared algorithmically by RedFlag Terminal. Analysis grounded in public SEC EDGAR 10-K disclosures and Regulation S-X quantitative standards. Not intended as individualized investment or legal advice.
          </div>
        </div>
      </div>
    </div>
  );
};
