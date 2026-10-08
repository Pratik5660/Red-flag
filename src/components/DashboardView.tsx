import React, { useState } from 'react';
import { 
  Building2, 
  Table, 
  ShieldAlert, 
  FileSpreadsheet, 
  FileText, 
  SlidersHorizontal,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CompanyForensicReport, ForensicFlag } from '../types';
import { TickerSelector } from './TickerSelector';
import { LiveMarketFeedBar } from './LiveMarketFeedBar';
import { CoverageSummaryCard } from './CoverageSummaryCard';
import { FlagsTable } from './FlagsTable';
import { FinancialSummaryTable } from './FinancialSummaryTable';

interface DashboardViewProps {
  report: CompanyForensicReport;
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  onSelectFlag: (flag: ForensicFlag) => void;
  onOpenStressTester: () => void;
  onOpenAuditMemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  report,
  selectedTicker,
  onSelectTicker,
  onSelectFlag,
  onOpenStressTester,
  onOpenAuditMemo,
}) => {
  const [activeTab, setActiveTab] = useState<'flags' | 'financials' | 'overview'>('flags');

  return (
    <div className="space-y-6 pb-20">
      {/* Top Controls Bar: Ticker Selector & Action Shortcuts */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-mono uppercase text-slate-400">Target Ticker:</span>
          <TickerSelector
            selectedTicker={selectedTicker}
            onSelectTicker={onSelectTicker}
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onOpenStressTester}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Sensitivity Shock</span>
          </button>

          <button
            onClick={onOpenAuditMemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Executive Memo</span>
          </button>
        </div>
      </div>

      {/* 1. Live Market Feed Verification Component */}
      <LiveMarketFeedBar
        profile={report.profile}
        marketData={report.marketData}
      />

      {/* 2. Coverage & Score Summary Component */}
      <CoverageSummaryCard report={report} />

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('flags')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'flags'
              ? 'bg-red-950/80 text-red-200 border border-red-800 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Full 30-Flag Forensic Matrix</span>
          <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
            {report.flags.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('financials')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'financials'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Financial Data Summary (FY22–FY26)</span>
          <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
            {report.financialRows.length} Line Items
          </span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Info className="w-4 h-4 text-blue-400" />
          <span>SEC Filing & Auditor Dossier</span>
        </button>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'flags' && (
        <FlagsTable
          flags={report.flags}
          onSelectFlag={onSelectFlag}
        />
      )}

      {activeTab === 'financials' && (
        <FinancialSummaryTable
          financialRows={report.financialRows}
          ticker={selectedTicker}
        />
      )}

      {activeTab === 'overview' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6 text-xs text-slate-300">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Company Background & Regulatory Profile</h3>
            <p className="text-slate-400 leading-relaxed font-sans">{report.profile.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-mono">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Registered Accounting Firm</span>
              <span className="text-white font-bold text-sm mt-1 block">{report.profile.auditor}</span>
              <span className="text-emerald-400 text-[11px] mt-1 block">{report.profile.auditOpinion}</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">SEC EDGAR Accession</span>
              <span className="text-white font-bold text-sm mt-1 block">{report.profile.accessionNumber}</span>
              <span className="text-slate-400 text-[11px] mt-1 block">CIK {report.profile.cik}</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Fiscal Calendar</span>
              <span className="text-white font-bold text-sm mt-1 block">Year End: {report.profile.fiscalYearEnd}</span>
              <span className="text-slate-400 text-[11px] mt-1 block">Filed: {report.profile.secFilingDate}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">Auditor Key Audit Matters (KAMs)</h4>
            <div className="space-y-2">
              {report.profile.keyAuditMatters.map((kam, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 font-sans">
                  • {kam}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
