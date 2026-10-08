import React from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  FileText, 
  SlidersHorizontal, 
  User, 
  LogOut, 
  Search,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'dashboard' | 'auth';
  onNavigate: (view: 'landing' | 'dashboard' | 'auth') => void;
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  session: UserSession;
  onLogout: () => void;
  onOpenStressTester: () => void;
  onOpenAuditMemo: () => void;
}

const POPULAR_TICKERS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'WMT', 'TSLA'];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  selectedTicker,
  onSelectTicker,
  session,
  onLogout,
  onOpenStressTester,
  onOpenAuditMemo,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top micro-bar: Ticker Tape & Status */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1 border-b border-slate-900 bg-slate-950 text-xs font-mono-numbers text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-slate-300">SEC EDGAR FEED: CONNECTED</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 text-[11px]">XBRL TAXONOMY 2026.1 ACTIVE</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 text-[11px]">30/30 SCREENING INVARIANTS ARMED</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">YAHOO FINANCE TICK: <span className="text-slate-200">REAL-TIME</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-mono">LATENCY: 42ms</span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 via-red-700 to-rose-900 flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-500/30 group-hover:border-red-400 transition-colors">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-red-400 transition-colors">RedFlag</span>
                <span className="text-xs px-1.5 py-0.2 font-mono font-semibold bg-slate-800 text-red-400 border border-slate-700 rounded text-[10px]">TERMINAL</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">Forensic SEC Anomaly Screener</p>
            </div>
          </button>

          {/* Quick Ticker Switcher (visible in Dashboard) */}
          {currentView === 'dashboard' && (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg">
              {POPULAR_TICKERS.map((tick) => {
                const isActive = selectedTicker === tick;
                return (
                  <button
                    key={tick}
                    onClick={() => onSelectTicker(tick)}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-all ${
                      isActive
                        ? 'bg-red-950/80 text-red-300 border border-red-700/60 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {tick}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center / Right Nav Items */}
        <div className="flex items-center gap-3">
          {/* Main Action Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                currentView === 'landing' 
                  ? 'text-white bg-slate-800/80' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-white bg-red-950/60 border border-red-800/60' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              Terminal
            </button>
          </div>

          {currentView === 'dashboard' && (
            <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-3">
              <button
                onClick={onOpenStressTester}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
                title="Simulate balance sheet shocks and test flag sensitivity"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                Stress Tester
              </button>

              <button
                onClick={onOpenAuditMemo}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
                title="Generate institutional forensic memorandum"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                Forensic Memo
              </button>
            </div>
          )}

          {/* User Auth state */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            {session.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-medium text-slate-200">{session.user?.name}</div>
                  <div className="text-[10px] text-red-400 font-mono">{session.user?.organization}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold">
                  {session.user?.name.charAt(0) || 'U'}
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md shadow-sm transition-all"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
