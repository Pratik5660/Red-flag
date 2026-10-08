import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ShieldAlert, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileSearch,
  ArrowUpDown
} from 'lucide-react';
import { ForensicFlag, FlagCategory, FlagLevel } from '../types';

interface FlagsTableProps {
  flags: ForensicFlag[];
  onSelectFlag: (flag: ForensicFlag) => void;
}

export const FlagsTable: React.FC<FlagsTableProps> = ({ flags, onSelectFlag }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'compact' | 'side-by-side'>('side-by-side');

  // Categories list
  const categories = ['All', 'Gating', 'Revenue', 'Expense', 'Working Capital', 'Cash Flow', 'Governance'];

  // Filtered flags
  const filteredFlags = useMemo(() => {
    return flags.filter((f) => {
      // Category filter
      if (selectedCategory !== 'All' && f.category !== selectedCategory) {
        return false;
      }
      // Severity filter
      if (selectedSeverity === 'RED' && f.level !== 'RED') return false;
      if (selectedSeverity === 'YELLOW' && f.level !== 'YELLOW') return false;
      if (selectedSeverity === 'GREEN' && f.level !== 'GREEN') return false;
      if (selectedSeverity === 'GATING' && !f.isGating) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = f.name.toLowerCase().includes(query);
        const matchId = f.id.toLowerCase().includes(query);
        const matchCitation = f.citation.toLowerCase().includes(query);
        const matchAnalysis = f.forensicAnalysis.toLowerCase().includes(query);
        if (!matchName && !matchId && !matchCitation && !matchAnalysis) return false;
      }

      return true;
    });
  }, [flags, selectedCategory, selectedSeverity, searchQuery]);

  // Level badge generator
  const renderLevelBadge = (level: FlagLevel, isGating: boolean) => {
    if (level === 'RED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-700/80 shadow-sm shadow-rose-950/50">
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>RED FLAG</span>
        </span>
      );
    }
    if (level === 'YELLOW') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-950/70 text-amber-300 border border-amber-700/70">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>YELLOW</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-800/60">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
        <span>GREEN</span>
      </span>
    );
  };

  const renderTrendIcon = (trend: string) => {
    if (trend === 'improving') {
      return (
        <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-mono" title="Improving trend">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">Improving</span>
        </span>
      );
    }
    if (trend === 'deteriorating') {
      return (
        <span className="flex items-center gap-0.5 text-rose-400 text-xs font-mono" title="Deteriorating trend">
          <TrendingDown className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">Deteriorating</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-0.5 text-slate-400 text-xs font-mono" title="Stable">
        <Minus className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[10px]">Stable</span>
      </span>
    );
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>Full 30-Flag Forensic Screening Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated rules scanning balance sheet distortions, revenue timing, and SEC disclosure anomalies.
            </p>
          </div>

          {/* View toggle (Compact vs Side-by-side) */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-400">View:</span>
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                  viewMode === 'side-by-side' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                FY22–FY26 Multi-Year
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                  viewMode === 'compact' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Compact Summary
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-red-950/80 text-red-200 border border-red-800/70 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
                {cat === 'Gating' && <span className="ml-1 text-[10px] text-amber-400 font-mono">[GATE]</span>}
              </button>
            ))}
          </div>

          {/* Search + Severity Filter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search flag or citation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/60 transition-colors"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-500/60 font-mono"
            >
              <option value="All">All Severities</option>
              <option value="RED">Red Flags Only</option>
              <option value="YELLOW">Yellow Flags Only</option>
              <option value="GREEN">Green Flags Only</option>
              <option value="GATING">Gating Flags Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-20">ID</th>
              <th className="py-3 px-4 min-w-[220px]">Flag Description</th>
              <th className="py-3 px-3 w-28">Category</th>
              <th className="py-3 px-3 w-24">State</th>
              {viewMode === 'side-by-side' ? (
                <>
                  <th className="py-3 px-2 text-center w-20 font-mono">FY22</th>
                  <th className="py-3 px-2 text-center w-20 font-mono">FY23</th>
                  <th className="py-3 px-2 text-center w-20 font-mono">FY24</th>
                  <th className="py-3 px-2 text-center w-20 font-mono">FY25</th>
                  <th className="py-3 px-2 text-center w-20 font-mono">FY26</th>
                </>
              ) : (
                <th className="py-3 px-4 min-w-[160px]">Current Value / Reading</th>
              )}
              <th className="py-3 px-4 w-32">Assigned Level</th>
              <th className="py-3 px-3 w-28">Trend</th>
              <th className="py-3 px-4 min-w-[200px]">SEC 10-K Citation</th>
              <th className="py-3 px-3 text-right w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
            {filteredFlags.length === 0 ? (
              <tr>
                <td colSpan={viewMode === 'side-by-side' ? 12 : 8} className="py-12 text-center text-slate-400 text-sm">
                  No forensic flags matched the active filter criteria.
                </td>
              </tr>
            ) : (
              filteredFlags.map((flag) => {
                const isRed = flag.level === 'RED';
                const isYellow = flag.level === 'YELLOW';

                return (
                  <tr
                    key={flag.id}
                    onClick={() => onSelectFlag(flag)}
                    className={`group cursor-pointer transition-colors ${
                      isRed 
                        ? 'bg-rose-950/20 hover:bg-rose-950/40' 
                        : isYellow
                        ? 'bg-amber-950/10 hover:bg-amber-950/30'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-300 group-hover:text-white">
                      <div className="flex items-center gap-1">
                        <span>{flag.id}</span>
                        {flag.isGating && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950/80 px-1 rounded border border-amber-800">
                            GATE
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-sans font-medium text-slate-100 group-hover:text-white flex items-center gap-1.5">
                        <span>{flag.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                        {flag.threshold}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="text-slate-400 text-[11px] font-sans">
                        {flag.category}
                      </span>
                    </td>

                    {/* State */}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {flag.state}
                      </span>
                    </td>

                    {/* Side-by-side or Compact values */}
                    {viewMode === 'side-by-side' ? (
                      <>
                        <td className="py-3 px-2 text-center font-mono text-xs text-slate-400">
                          {String(flag.historicalValues.FY22)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-xs text-slate-400">
                          {String(flag.historicalValues.FY23)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-xs text-slate-300">
                          {String(flag.historicalValues.FY24)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-xs text-slate-200 font-semibold">
                          {String(flag.historicalValues.FY25)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-xs text-slate-200 font-semibold">
                          {String(flag.historicalValues.FY26)}
                        </td>
                      </>
                    ) : (
                      <td className="py-3 px-4 font-mono font-medium text-slate-200">
                        {flag.currentValue}
                      </td>
                    )}

                    {/* Assigned Level */}
                    <td className="py-3 px-4">
                      {renderLevelBadge(flag.level, flag.isGating)}
                    </td>

                    {/* Trend */}
                    <td className="py-3 px-3">
                      {renderTrendIcon(flag.trend)}
                    </td>

                    {/* SEC Citation */}
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-mono text-slate-400 truncate block max-w-xs" title={flag.citation}>
                        {flag.citation}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFlag(flag);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                        title="Open deep-dive inspector"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer metadata */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div>
          Showing <span className="text-white font-mono">{filteredFlags.length}</span> of <span className="text-white font-mono">{flags.length}</span> forensic screening flags
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Red = Anomaly Triggered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Yellow = Elevated Variance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Green = Normal Bounds
          </span>
        </div>
      </div>
    </div>
  );
};
