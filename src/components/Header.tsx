import React from 'react';
import { ShieldCheck, Cpu, Database, Award, Code2, Play, RefreshCw, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'terminal' | 'dag' | 'audit' | 'benchmark' | 'schemas' | 'thesis';
  setActiveTab: (tab: 'terminal' | 'dag' | 'audit' | 'benchmark' | 'schemas' | 'thesis') => void;
  isExecuting: boolean;
  onRunDemo: (ticker: string) => void;
  activeTicker: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isExecuting,
  onRunDemo,
  activeTicker,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Bar: Financial Marquee & Status */}
      <div className="border-b border-slate-800/60 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-3 overflow-x-auto py-0.5">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE SEC EDGAR + MARKET FEED
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">TSLA <span className="text-emerald-400">$248.50 (+1.8%)</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">NVDA <span className="text-emerald-400">$132.80 (+3.1%)</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">AAPL <span className="text-rose-400">$231.40 (-0.4%)</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">MSFT <span className="text-emerald-400">$432.10 (+0.9%)</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">AMZN <span className="text-emerald-400">$196.50 (+1.2%)</span></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300">META <span className="text-emerald-400">$588.20 (+2.2%)</span></span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400">Verifier Engine:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-mono">
            ADVERSARIAL ε ≤ 0.01
          </span>
          <span className="hidden sm:inline text-slate-500">B.Tech AI Capstone 2026</span>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/40">
            <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-wider text-slate-100 font-['Cinzel']">
                VERITAS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest font-semibold">
                Multi-Agent Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Autonomous Market Intelligence with Citation-Verified Financial Reporting
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto bg-slate-900/90 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'terminal'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Research Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('dag')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'dag'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent Graph (DAG)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Citation & Audit Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'benchmark'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Evaluation Benchmark</span>
          </button>

          <button
            onClick={() => setActiveTab('schemas')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'schemas'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Agent Schemas</span>
          </button>

          <button
            onClick={() => setActiveTab('thesis')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'thesis'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-amber-400/90 hover:text-amber-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="font-semibold">Synopsis & Thesis</span>
          </button>
        </div>

        {/* Quick Ticker Demo Trigger */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Demo:</span>
          {['TSLA', 'NVDA', 'AAPL', 'MSFT'].map(t => (
            <button
              key={t}
              onClick={() => onRunDemo(t)}
              disabled={isExecuting}
              className={`text-xs px-2.5 py-1 rounded font-mono font-medium transition-all ${
                activeTicker === t
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              } disabled:opacity-50`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
