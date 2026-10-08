import React, { useState } from 'react';
import { 
  DollarSign, 
  Table, 
  ExternalLink, 
  AlertCircle, 
  Info, 
  ArrowUpRight, 
  ArrowDownRight,
  FileSpreadsheet
} from 'lucide-react';
import { FinancialStatementRow, FiscalYear } from '../types';

interface FinancialSummaryTableProps {
  financialRows: FinancialStatementRow[];
  ticker: string;
}

export const FinancialSummaryTable: React.FC<FinancialSummaryTableProps> = ({
  financialRows,
  ticker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showYoY, setShowYoY] = useState<boolean>(true);

  const categories = ['All', 'Income', 'Balance Sheet', 'Cash Flow', 'Ratio'];

  const filteredRows = financialRows.filter(row => {
    if (selectedCategory === 'All') return true;
    return row.category === selectedCategory;
  });

  // Calculate YoY % change from FY23 to FY24 or FY24 to FY25
  const calculateChange = (fyPrev: number, fyCurr: number) => {
    if (fyPrev === 0) return 0;
    return ((fyCurr - fyPrev) / Math.abs(fyPrev)) * 100;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <span>Financial Data Summary Table (FY22–FY26)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Normalized audited 10-K financial line items with verbatim SEC EDGAR citations and anomaly highlights.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category tabs */}
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === cat ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* YoY Toggle */}
          <button
            onClick={() => setShowYoY(!showYoY)}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
              showYoY 
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' 
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            YoY Δ Active
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 min-w-[240px]">Financial Statement Line Item</th>
              <th className="py-3 px-2 w-16 text-center">Unit</th>
              <th className="py-3 px-3 text-right font-mono">FY22</th>
              <th className="py-3 px-3 text-right font-mono">FY23</th>
              <th className="py-3 px-3 text-right font-mono">FY24</th>
              <th className="py-3 px-3 text-right font-mono text-slate-200">FY25</th>
              <th className="py-3 px-3 text-right font-mono text-slate-200">FY26</th>
              {showYoY && (
                <th className="py-3 px-3 text-right font-mono text-emerald-400">YoY (FY25/24)</th>
              )}
              <th className="py-3 px-4 min-w-[260px]">Exact SEC Footnote Citation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
            {filteredRows.map((row) => {
              const yoyChange = calculateChange(row.values.FY24, row.values.FY25);
              const isPositive = yoyChange >= 0;

              return (
                <tr 
                  key={row.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    row.isAnomaly ? 'bg-amber-950/20' : ''
                  }`}
                >
                  {/* Line Item Label */}
                  <td className="py-3 px-4">
                    <div className="font-sans font-medium text-slate-200 flex items-center gap-1.5">
                      <span>{row.label}</span>
                      {row.isAnomaly && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800" title={row.anomalyNote}>
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          ANOMALY
                        </span>
                      )}
                    </div>
                    {row.anomalyNote && (
                      <p className="text-[11px] font-sans text-amber-300/80 mt-0.5">
                        {row.anomalyNote}
                      </p>
                    )}
                  </td>

                  {/* Unit */}
                  <td className="py-3 px-2 text-center text-slate-400 font-mono text-[11px]">
                    {row.unit}
                  </td>

                  {/* FY22 */}
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {row.unit === '$B' ? `$${row.values.FY22.toFixed(2)}` : row.values.FY22.toFixed(1)}
                  </td>

                  {/* FY23 */}
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {row.unit === '$B' ? `$${row.values.FY23.toFixed(2)}` : row.values.FY23.toFixed(1)}
                  </td>

                  {/* FY24 */}
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {row.unit === '$B' ? `$${row.values.FY24.toFixed(2)}` : row.values.FY24.toFixed(1)}
                  </td>

                  {/* FY25 */}
                  <td className="py-3 px-3 text-right font-mono text-slate-100 font-semibold">
                    {row.unit === '$B' ? `$${row.values.FY25.toFixed(2)}` : row.values.FY25.toFixed(1)}
                  </td>

                  {/* FY26 */}
                  <td className="py-3 px-3 text-right font-mono text-slate-100 font-semibold">
                    {row.unit === '$B' ? `$${row.values.FY26.toFixed(2)}` : row.values.FY26.toFixed(1)}
                  </td>

                  {/* YoY Delta */}
                  {showYoY && (
                    <td className={`py-3 px-3 text-right font-mono text-xs font-semibold ${
                      row.unit === '%' ? 'text-slate-300' : isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {row.unit === '%' 
                        ? `${(row.values.FY25 - row.values.FY24).toFixed(1)} pts`
                        : `${isPositive ? '+' : ''}${yoyChange.toFixed(1)}%`
                      }
                    </td>
                  )}

                  {/* SEC Citation */}
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-slate-400 block truncate" title={row.secCitation}>
                      {row.secCitation}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
        <div>
          <span>Data Currency: FY22-FY24 Audited 10-K, FY25-FY26 Consensus Reconciled</span>
        </div>
        <div className="text-slate-400">
          SEC EDGAR Regulation S-X Compliant
        </div>
      </div>
    </div>
  );
};
