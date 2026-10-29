import React, { useState } from 'react';
import { AGENT_SPECIFICATIONS } from '../engine/agentSchemas';
import { Code2, Compass, Database, LineChart, ShieldAlert, FileCheck2, Copy, Check, BookOpen } from 'lucide-react';

export const PromptSchemaViewer: React.FC = () => {
  const [selectedAgentKey, setSelectedAgentKey] = useState<string>('verifier');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const agentKeys = ['planner', 'retriever', 'analyzer', 'verifier', 'generator'];
  const spec = AGENT_SPECIFICATIONS[selectedAgentKey];

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-['Cinzel'] tracking-wide">
                Agent Prompt Schemas & Verification Specification (Step 2)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Formal academic specification for all 5 specialized agents, including system instructions, structured JSON I/O contracts, numerical tolerance boundaries, and failure mode mitigations.
            </p>
          </div>
        </div>

        {/* Agent Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {agentKeys.map(key => {
            const agent = AGENT_SPECIFICATIONS[key];
            const isSelected = selectedAgentKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedAgentKey(key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{agent.name}</span>
                {key === 'verifier' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${isSelected ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/10 text-amber-400'}`}>
                    Core Innovation
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Spec Card */}
      {spec && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: System Prompt & Role (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* System Prompt Block */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider">
                    System Instruction Prompt ({spec.name})
                  </h3>
                </div>
                <button
                  onClick={() => handleCopyPrompt(spec.systemPrompt, 'prompt')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                >
                  {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'prompt' ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <pre className="text-xs font-mono text-slate-200 bg-slate-950/90 p-4 rounded-lg border border-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {spec.systemPrompt}
              </pre>
            </div>

            {/* Failure Modes & Mitigations (Chapter 11) */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
              <h3 className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">
                Failure Modes & Academic Mitigations (Chapter 11)
              </h3>
              <div className="space-y-3">
                {spec.failureModesAndMitigations.map((fm, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1.5">
                    <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                      <span className="text-rose-500 font-bold">⚠ Risk:</span>
                      <span>{fm.failureMode}</span>
                    </div>
                    <div className="text-emerald-300 pl-4 border-l-2 border-emerald-600/60">
                      <span className="text-slate-400">Mitigation: </span>
                      {fm.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Input/Output JSON Schemas & Formulas (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mathematical Rules (For Verifier) */}
            {spec.mathematicalRules && (
              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
                <h3 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">
                  Adversarial Verification Protocol
                </h3>
                <ul className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                  {spec.mathematicalRules.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Input JSON Schema */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Input Schema Payload
              </div>
              <p className="text-xs text-slate-500">{spec.inputSchema.description}</p>
              <pre className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-3.5 rounded-lg border border-slate-800 max-h-48 overflow-y-auto">
                {JSON.stringify(spec.inputSchema.example, null, 2)}
              </pre>
            </div>

            {/* Output JSON Schema */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Output Schema Contract
              </div>
              <p className="text-xs text-slate-500">{spec.outputSchema.description}</p>
              <pre className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-3.5 rounded-lg border border-slate-800 max-h-52 overflow-y-auto">
                {JSON.stringify(spec.outputSchema.example, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
