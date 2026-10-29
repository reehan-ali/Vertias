import React, { useState } from 'react';
import { AgentStepTrace, AgentType } from '../types/veritas';
import { AGENT_SPECIFICATIONS } from '../engine/agentSchemas';
import {
  Compass,
  Database,
  LineChart,
  ShieldAlert,
  FileCheck2,
  RefreshCw,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';

interface AgentGraphVisualizerProps {
  traces: AgentStepTrace[];
  isExecuting: boolean;
  activeAgent: AgentType | null;
  feedbackLoopActive: boolean;
}

export const AgentGraphVisualizer: React.FC<AgentGraphVisualizerProps> = ({
  traces,
  isExecuting,
  activeAgent,
  feedbackLoopActive,
}) => {
  const [selectedAgentKey, setSelectedAgentKey] = useState<string>('verifier');

  const nodes: {
    key: AgentType;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      key: 'planner',
      label: 'Planner Agent',
      sublabel: 'Goal Decomposition',
      icon: <Compass className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'retriever',
      label: 'Retriever Agent',
      sublabel: 'SEC EDGAR & Markets',
      icon: <Database className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      key: 'analyzer',
      label: 'Analyzer Agent',
      sublabel: 'Claim Synthesis',
      icon: <LineChart className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-600',
    },
    {
      key: 'verifier',
      label: 'Verifier Agent',
      sublabel: 'Adversarial Audit & ε-Tolerance',
      icon: <ShieldAlert className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'generator',
      label: 'Report Generator',
      sublabel: 'Cited Institutional Memo',
      icon: <FileCheck2 className="w-5 h-5" />,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const getAgentStatus = (agentKey: AgentType) => {
    if (activeAgent === agentKey && isExecuting) return 'running';
    const relevantTraces = traces.filter(t => t.agent === agentKey);
    if (relevantTraces.length === 0) return 'idle';
    if (relevantTraces.some(t => t.status === 'loopback')) return 'loopback';
    if (relevantTraces.some(t => t.status === 'completed')) return 'completed';
    return 'idle';
  };

  const selectedSpec = AGENT_SPECIFICATIONS[selectedAgentKey];
  const agentTraces = traces.filter(t => t.agent === selectedAgentKey);

  return (
    <div className="space-y-6">
      {/* Visual Pipeline DAG Card */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-['Cinzel'] tracking-wide">
                Multi-Agent Orchestration Graph (DAG)
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Self-Checking Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Featuring autonomous Verifier $\leftrightarrow$ Retriever feedback loop for ungrounded claims
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Verified
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              Feedback Loop Active
            </span>
          </div>
        </div>

        {/* The Interactive DAG Representation */}
        <div className="relative py-8 px-2 sm:px-6 bg-slate-950/60 rounded-xl border border-slate-800/80">
          {/* Main Horizontal Node Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const status = getAgentStatus(node.key);
              const isSelected = selectedAgentKey === node.key;

              return (
                <div key={node.key} className="flex flex-col items-center relative">
                  <div
                    onClick={() => setSelectedAgentKey(node.key)}
                    className={`w-full p-4 rounded-xl border transition-all cursor-pointer text-center relative ${
                      isSelected
                        ? 'border-amber-400 bg-slate-800/90 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-850'
                    } ${
                      status === 'running'
                        ? 'ring-2 ring-amber-400 animate-pulse'
                        : status === 'loopback'
                        ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-950/20'
                        : ''
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      {status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {status === 'running' && (
                        <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                      )}
                      {status === 'loopback' && (
                        <RefreshCw className="w-4 h-4 text-amber-400" />
                      )}
                      {status === 'idle' && (
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>

                    {/* Agent Icon */}
                    <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center text-white mb-2 shadow-md`}>
                      {node.icon}
                    </div>

                    <div className="text-xs font-bold text-slate-100 font-mono">
                      {node.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {node.sublabel}
                    </div>

                    {/* Execution Latency Tag if completed */}
                    {traces.find(t => t.agent === node.key && t.status === 'completed') && (
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{traces.find(t => t.agent === node.key && t.status === 'completed')?.latencyMs}ms</span>
                      </div>
                    )}
                  </div>

                  {/* Desktop Forward Flow Arrow (except last node) */}
                  {index < nodes.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Verification Feedback Loop Banner / Indicator */}
          <div className={`mt-6 p-3 rounded-lg border transition-all text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 ${
            feedbackLoopActive
              ? 'bg-amber-950/40 border-amber-600/70 text-amber-200'
              : 'bg-slate-900/40 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${feedbackLoopActive ? 'text-amber-400 animate-spin' : 'text-slate-500'}`} />
              <span className="font-bold">
                FEEDBACK CHANNEL: Verifier ➔ Retriever Secondary Ingestion Loop
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Trigger Condition:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                Confidence &lt; 0.85 OR Missing Primary Text
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Agent Inspector & Trace Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Agent Specification & Role Details */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                {selectedSpec?.name || 'Agent Specification'}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              ID: {selectedSpec?.id}
            </span>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1">
              Core Mandate
            </div>
            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              {selectedSpec?.role}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1">
              System Instruction Prompt
            </div>
            <pre className="text-[11px] font-mono text-slate-300 bg-slate-950/90 p-3 rounded-lg border border-slate-800 max-h-44 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {selectedSpec?.systemPrompt}
            </pre>
          </div>

          {selectedSpec?.mathematicalRules && (
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1">
                Adversarial Verification Protocol
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 font-mono">
                {selectedSpec.mathematicalRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Real-time Trace & Step Output Log */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Execution Steps & Traces ({agentTraces.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Live Audit Log
            </span>
          </div>

          {agentTraces.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs font-mono">
              No runtime traces captured for this agent yet. Execute a research query to monitor state transitions.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {agentTraces.map((trace, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                    trace.status === 'loopback'
                      ? 'bg-amber-950/20 border-amber-800/60 text-amber-200'
                      : trace.status === 'completed'
                      ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-100 flex items-center gap-1.5">
                      {trace.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {trace.status === 'loopback' && <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                      <span>{trace.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">{trace.timestamp}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-1">
                    <span className="text-slate-500">Input: </span>
                    {trace.inputSummary}
                  </div>

                  <div className="text-[11px] text-slate-300">
                    <span className="text-emerald-400">Output: </span>
                    {trace.outputSummary}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Latency: {trace.latencyMs}ms</span>
                    <span className="uppercase text-emerald-400 font-semibold">{trace.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
