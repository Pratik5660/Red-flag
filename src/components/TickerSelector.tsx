import React, { useState } from 'react';
import { Search, Building2, Check, Sparkles } from 'lucide-react';
import { COMPANIES } from '../data/companies';

interface TickerSelectorProps {
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
}

export const TickerSelector: React.FC<TickerSelectorProps> = ({
  selectedTicker,
  onSelectTicker,
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const tickerList = Object.keys(COMPANIES);

  const filtered = tickerList.filter((tick) => {
    const comp = COMPANIES[tick];
    const q = search.toLowerCase();
    return tick.toLowerCase().includes(q) || comp.profile.name.toLowerCase().includes(q);
  });

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      {/* Searchable input button */}
      <div className="relative">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 focus-within:border-red-500/80 transition-colors w-48 sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search ticker or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-mono uppercase"
          />
        </div>

        {/* Dropdown Results */}
        {isOpen && search && (
          <div 
            className="absolute left-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-30 overflow-hidden divide-y divide-slate-800"
            onMouseLeave={() => setIsOpen(false)}
          >
            {filtered.length === 0 ? (
              <div className="p-3 text-xs text-slate-400 text-center font-mono">
                No matching US tickers in index
              </div>
            ) : (
              filtered.map((tick) => {
                const comp = COMPANIES[tick];
                return (
                  <button
                    key={tick}
                    type="button"
                    onClick={() => {
                      onSelectTicker(tick);
                      setSearch('');
                      setIsOpen(false);
                    }}
                    className="w-full p-2.5 text-left text-xs hover:bg-slate-800/80 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-white mr-2">{tick}</span>
                      <span className="text-slate-300 truncate">{comp.profile.name}</span>
                    </div>
                    {selectedTicker === tick && (
                      <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Quick Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {tickerList.map((tick) => {
          const isActive = selectedTicker === tick;
          return (
            <button
              key={tick}
              onClick={() => onSelectTicker(tick)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tick}
            </button>
          );
        })}
      </div>
    </div>
  );
};
