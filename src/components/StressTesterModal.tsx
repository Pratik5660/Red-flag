import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  RefreshCw, 
  AlertTriangle, 
  TrendingDown, 
  Zap,
  Activity
} from 'lucide-react';
import { CompanyForensicReport } from '../types';

interface StressTesterModalProps {
  report: CompanyForensicReport;
  onClose: () => void;
}

export const StressTesterModal: React.FC<StressTesterModalProps> = ({ report, onClose }) => {
  const [receivablesShock, setReceivablesShock] = useState<number>(0); // 0 to 40%
  const [marginCompression, setMarginCompression] = useState<number>(0); // 0 to 400 bps
  const [inventoryShock, setInventoryShock] = useState<number>(0); // 0 to 50%

  // Simulated recalculated score
  const baseScore = report.healthScore;
  const scoreDeduction = Math.round((receivablesShock * 0.4) + (marginCompression * 0.04) + (inventoryShock * 0.3));
  const simulatedScore = Math.max(10, baseScore - scoreDeduction);

  const resetShocks = () => {
    setReceivablesShock(0);
    setMarginCompression(0);
    setInventoryShock(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Forensic Sensitivity & Stress Tester
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs font-sans">
          <p className="text-slate-400 leading-relaxed">
            Simulate balance sheet shocks for <strong className="text-white font-mono">{report.profile.name} ({report.profile.ticker})</strong> to observe how rapidly quantitative accounting thresholds breach and downgrade the forensic integrity score.
          </p>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-950 p-5 rounded-xl border border-slate-800">
            {/* Slider 1: Receivables Expansion */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Unbilled Receivables Surge (DSO Acceleration)</span>
                <span className="font-mono text-amber-400 font-bold">+{receivablesShock}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={receivablesShock}
                onChange={(e) => setReceivablesShock(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-mono">
                Impacts RF-04 (Sloan Accruals) and RF-05 (Days Sales Outstanding)
              </span>
            </div>

            {/* Slider 2: Gross Margin Compression */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Gross Margin Contraction (Pricing Shock)</span>
                <span className="font-mono text-rose-400 font-bold">-{marginCompression} bps</span>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="50"
                value={marginCompression}
                onChange={(e) => setMarginCompression(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-mono">
                Impacts RF-07 (Gross Margin Degradation vs Sales Velocity)
              </span>
            </div>

            {/* Slider 3: Inventory Decoupling */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Inventory Accumulation (DSI Bottleneck)</span>
                <span className="font-mono text-blue-400 font-bold">+{inventoryShock}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={inventoryShock}
                onChange={(e) => setInventoryShock(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-mono">
                Impacts RF-06 (Days Sales in Inventory vs COGS velocity)
              </span>
            </div>
          </div>

          {/* Live Outcome Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Baseline Health Score</span>
              <span className="text-3xl font-extrabold font-mono text-slate-200 mt-1 block">
                {baseScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Stressed Health Score</span>
              <span className={`text-3xl font-extrabold font-mono mt-1 block ${
                simulatedScore >= 80 ? 'text-emerald-400' : simulatedScore >= 60 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {simulatedScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
              <span className="text-[10px] font-mono text-rose-400 block mt-0.5">
                {scoreDeduction > 0 ? `-${scoreDeduction} points degradation` : 'No shock applied'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={resetShocks}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Shocks</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
