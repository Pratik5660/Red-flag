import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { UserSession } from '../types';

interface AuthViewProps {
  onSuccess: (session: UserSession) => void;
  onCancel: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess, onCancel }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (mode === 'signup' && (!name || !organization)) {
      setError('Please provide your name and institutional organization.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        isAuthenticated: true,
        user: {
          email,
          name: name || (email.split('@')[0].toUpperCase()),
          role: 'Institutional Forensic Analyst',
          organization: organization || 'Apex Capital Management',
        },
        token: `jwt_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      };
      localStorage.setItem('redflag_session', JSON.stringify(session));
      onSuccess(session);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        isAuthenticated: true,
        user: {
          email: 'analyst@redflag-terminal.io',
          name: 'Sarah Chen, CFA',
          role: 'Senior Forensic Analyst',
          organization: 'Bridgewater Quantitative Research',
        },
        token: `jwt_demo_${Date.now()}`,
      };
      localStorage.setItem('redflag_session', JSON.stringify(session));
      onSuccess(session);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/80 mx-auto flex items-center justify-center text-red-400 mb-3 shadow-lg shadow-red-950/40">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Institutional Sign In' : 'Create Terminal Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access automated SEC EDGAR forensic screening models
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              mode === 'login' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              mode === 'signup' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Institution / Firm</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Citadel Quantitative Research"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                placeholder="name@firm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Terminal' : 'Register Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-2.5">
            Testing the terminal without an account?
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Demo Access (One-Click)</span>
          </button>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <button
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Cancel and Return to Overview
          </button>
        </div>
      </div>
    </div>
  );
};
