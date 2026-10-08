import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { AuthView } from './components/AuthModal';
import { FlagDetailDrawer } from './components/FlagDetailDrawer';
import { StressTesterModal } from './components/StressTesterModal';
import { AuditReportModal } from './components/AuditReportModal';
import { buildForensicReport } from './data/forensicReports';
import { ForensicFlag, UserSession } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'auth'>('landing');
  const [selectedTicker, setSelectedTicker] = useState<string>('AAPL');
  const [selectedFlag, setSelectedFlag] = useState<ForensicFlag | null>(null);
  const [isStressTesterOpen, setIsStressTesterOpen] = useState(false);
  const [isAuditMemoOpen, setIsAuditMemoOpen] = useState(false);

  // User session state
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem('redflag_session');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // Fallback
    }
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  });

  // Build the active forensic report for selected ticker
  const activeReport = buildForensicReport(selectedTicker);

  // Switch ticker handler
  const handleSelectTicker = (ticker: string) => {
    setSelectedTicker(ticker);
  };

  // Launch terminal from landing page
  const handleLaunchTerminal = (ticker?: string) => {
    if (ticker) {
      setSelectedTicker(ticker);
    }
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth success handler
  const handleAuthSuccess = (newSession: UserSession) => {
    setSession(newSession);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('redflag_session');
    setSession({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Terminal Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        selectedTicker={selectedTicker}
        onSelectTicker={handleSelectTicker}
        session={session}
        onLogout={handleLogout}
        onOpenStressTester={() => setIsStressTesterOpen(true)}
        onOpenAuditMemo={() => setIsAuditMemoOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onLaunchTerminal={handleLaunchTerminal}
            onNavigateAuth={() => setCurrentView('auth')}
          />
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <DashboardView
              report={activeReport}
              selectedTicker={selectedTicker}
              onSelectTicker={handleSelectTicker}
              onSelectFlag={(flag) => setSelectedFlag(flag)}
              onOpenStressTester={() => setIsStressTesterOpen(true)}
              onOpenAuditMemo={() => setIsAuditMemoOpen(true)}
            />
          </div>
        )}

        {currentView === 'auth' && (
          <AuthView
            onSuccess={handleAuthSuccess}
            onCancel={() => setCurrentView('landing')}
          />
        )}
      </main>

      {/* Deep-dive Flag Detail Drawer */}
      {selectedFlag && (
        <FlagDetailDrawer
          flag={selectedFlag}
          onClose={() => setSelectedFlag(null)}
          cik={activeReport.profile.cik}
        />
      )}

      {/* Stress Tester Modal */}
      {isStressTesterOpen && (
        <StressTesterModal
          report={activeReport}
          onClose={() => setIsStressTesterOpen(false)}
        />
      )}

      {/* Audit Memorandum Modal */}
      {isAuditMemoOpen && (
        <AuditReportModal
          report={activeReport}
          onClose={() => setIsAuditMemoOpen(false)}
        />
      )}

      {/* Universal Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">RedFlag Terminal</span>
            <span className="text-slate-600">·</span>
            <span>SEC EDGAR XBRL Invariant Engine</span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-[11px] text-slate-400">Release 2026.4</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>GAAP / Regulation S-X Compliant</span>
            <span className="text-slate-700">·</span>
            <span>Yahoo Finance Quote Reconciled</span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400 font-mono">Status: All 30 Rules Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
