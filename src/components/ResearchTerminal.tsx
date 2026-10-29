import React, { useState } from 'react';
import { AgentStepTrace, AgentType, ClaimVerification, SourceEvidence, VeritasReport } from '../types/veritas';
import { ReportViewer } from './ReportViewer';
import { MARKET_DATA_PROFILES } from '../data/marketData';
import {
  Search,
  Play,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Cpu,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders,
  ChevronRight
} from 'lucide-react';

import { detectTickersFromQuery } from '../engine/orchestrator';

interface ResearchTerminalProps {
  onRunPipeline: (ticker: string, query: string, simulateFeedbackLoop: boolean) => Promise<void>;
  isExecuting: boolean;
  activeAgent: AgentType | null;
  traces: AgentStepTrace[];
  report: VeritasReport | null;
  onSelectClaim: (claim: ClaimVerification) => void;
  onSelectSource: (source: SourceEvidence) => void;
  selectedTicker: string;
  setSelectedTicker: (ticker: string) => void;
}

export const ResearchTerminal: React.FC<ResearchTerminalProps> = ({
  onRunPipeline,
  isExecuting,
  activeAgent,
  traces,
  report,
  onSelectClaim,
  onSelectSource,
  selectedTicker,
  setSelectedTicker,
}) => {
  const [queryInput, setQueryInput] = useState<string>(
    "Analyze Tesla's automotive gross margin excluding regulatory credits, regulatory credit dependence, and FSD robotaxi regulatory risks."
  );
  const [simulateFeedbackLoop, setSimulateFeedbackLoop] = useState<boolean>(true);

  const sampleResearchQueries: {
    ticker: string;
    title: string;
    query: string;
  }[] = [
    {
      ticker: 'NVDA',
      title: 'NVDA Investment: In which stock to invest?',
      query: "In which NVDA stocks should I invest and what are the primary valuation and supply chain risks?"
    },
    {
      ticker: 'TSLA',
      title: 'Apple vs Tesla: Comparative Margin Audit',
      query: "Apple vs Tesla: Compare gross margins, free cash flow conversion, and regulatory investigation risks."
    },
    {
      ticker: 'TSLA',
      title: 'Tesla: Automotive Margins & Credits',
      query: "Analyze Tesla's automotive gross margin excluding regulatory credits, regulatory credit dependence, and FSD robotaxi regulatory risks."
    },
    {
      ticker: 'NVDA',
      title: 'NVIDIA: FY25 Data Center & CoWoS',
      query: "Audit NVIDIA's FY2025 Data Center revenue explosion and compute/networking breakdown against single-source TSMC CoWoS packaging bottlenecks."
    },
    {
      ticker: 'AAPL',
      title: 'Apple: 74% Services Margin & EU DMA',
      query: "Compare Apple's Services gross margin (74%) with Products gross margin, and analyze antitrust risks under the European Union Digital Markets Act."
    },
    {
      ticker: 'MSFT',
      title: 'Microsoft: Azure AI & Capex',
      query: "What percentage points did Azure AI contribute to Azure's 30% growth in FY24, and how does that justify the $55.7B capital expenditure commitments?"
    },
    {
      ticker: 'AMZN',
      title: 'Amazon: AWS 37% Margin & Silicon',
      query: "Examine AWS operating income growth to $39.84B with 37.0% margins and the adoption of custom Trainium/Inferentia silicon."
    },
    {
      ticker: 'META',
      title: 'Meta: Family of Apps vs Reality Labs',
      query: "Evaluate Meta's Family of Apps operating profitability ($79.82B) and whether it adequately absorbs the ongoing $17.73B Reality Labs annual operating burn."
    }
  ];

  const handleSelectPreset = (item: typeof sampleResearchQueries[0]) => {
    setSelectedTicker(item.ticker);
    setQueryInput(item.query);
  };

  const detectedTickers = detectTickersFromQuery(queryInput, selectedTicker);

  const handleExecute = () => {
    if (!queryInput.trim() || isExecuting) return;
    const targetTicker = detectedTickers[0] || selectedTicker;
    if (detectedTickers.length === 1 && detectedTickers[0] !== selectedTicker) {
      setSelectedTicker(detectedTickers[0]);
    }
    onRunPipeline(targetTicker, queryInput, simulateFeedbackLoop);
  };

  return (
    <div className="space-y-6">
      {/* Research Goal Command Bar */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-2xl space-y-4">
        {/* Ticker Quick Picker */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Target Entity:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(MARKET_DATA_PROFILES).map((t) => {
                const isSelected = selectedTicker === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTicker(t);
                      const matchingPreset = sampleResearchQueries.find(p => p.ticker === t);
                      if (matchingPreset) setQueryInput(matchingPreset.query);
                    }}
                    disabled={isExecuting}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Loop Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={simulateFeedbackLoop}
                onChange={e => setSimulateFeedbackLoop(e.target.checked)}
                className="w-3.5 h-3.5 accent-amber-500 rounded cursor-pointer"
              />
              <span>Enable Verifier $\leftrightarrow$ Retriever Feedback Loop</span>
            </label>
          </div>
        </div>

        {/* Input Bar & Execution Trigger */}
        <form onSubmit={e => { e.preventDefault(); handleExecute(); }} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={queryInput}
                onChange={e => setQueryInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleExecute();
                  }
                }}
                placeholder="Enter institutional research goal (e.g. Apple vs Tesla, or Analyze segment margins)..."
                disabled={isExecuting}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans shadow-inner disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isExecuting || !queryInput.trim()}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Running Multi-Agent Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Launch Research</span>
                </>
              )}
            </button>
          </div>

          {/* Dynamic Query & Entity Detection Badge */}
          <div className="flex items-center justify-between text-[11px] font-mono px-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Query Mode:</span>
              {detectedTickers.length > 1 ? (
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                  <span>⚖ Comparative Audit Mode:</span>
                  <span className="text-white">{detectedTickers.join(' vs ')}</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Target: {detectedTickers[0] || selectedTicker}
                </span>
              )}
            </div>
            <span className="text-slate-500 hidden sm:inline">Press Enter ↵ to launch</span>
          </div>
        </form>

        {/* Query Presets Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs">
          <span className="text-[11px] font-mono text-slate-500 shrink-0">Presets:</span>
          {sampleResearchQueries.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              disabled={isExecuting}
              className="px-2.5 py-1 rounded-md bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80 text-[11px] font-mono whitespace-nowrap transition-all"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid: Left Live Agent Execution Trace (5 cols), Right Report Viewer (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Agent Trace Log */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider">
                  Live Agent Pipeline State
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                {isExecuting ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    Executing Node: {activeAgent?.toUpperCase() || 'INITIALIZING'}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pipeline Ready
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Steps */}
            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {traces.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs font-mono">
                  Select a research goal and click &quot;Launch Research&quot; to observe the 5-agent pipeline trace in real time.
                </div>
              ) : (
                traces.map((trace, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                      trace.status === 'loopback'
                        ? 'bg-amber-950/30 border-amber-500/80 text-amber-200 shadow-md shadow-amber-500/10'
                        : trace.status === 'running'
                        ? 'bg-slate-900 border-amber-400/60 text-slate-100 ring-1 ring-amber-400/40'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-slate-800 text-amber-300">
                          {trace.agent}
                        </span>
                        <span>{trace.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{trace.timestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-1 leading-relaxed">
                      {trace.inputSummary}
                    </p>

                    <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                      {trace.outputSummary}
                    </p>

                    {trace.status === 'loopback' && (
                      <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
                        <span>VERIFICATION LOOPBACK TRIGGERED: Autonomous re-querying of missing SEC disclosures.</span>
                      </div>
                    )}

                    <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Step #{trace.stepNumber}</span>
                      <span>Latency: {trace.latencyMs}ms</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Institutional Equity Research Memo */}
        <div className="lg:col-span-7">
          <ReportViewer
            report={report}
            isExecuting={isExecuting}
            onSelectClaim={onSelectClaim}
            onSelectSource={onSelectSource}
          />
        </div>
      </div>
    </div>
  );
};
