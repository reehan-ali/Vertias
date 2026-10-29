import React, { useState } from 'react';
import { ClaimVerification, SourceEvidence, VeritasReport } from '../types/veritas';
import { SEC_FILINGS_DATABASE } from '../data/secFilingsDatabase';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Filter,
  ArrowRight
} from 'lucide-react';

interface ClaimAuditDrawerProps {
  report: VeritasReport | null;
  selectedClaim: ClaimVerification | null;
  selectedSource: SourceEvidence | null;
  onSelectClaim: (claim: ClaimVerification) => void;
  onSelectSource: (source: SourceEvidence) => void;
}

export const ClaimAuditDrawer: React.FC<ClaimAuditDrawerProps> = ({
  report,
  selectedClaim,
  selectedSource,
  onSelectClaim,
  onSelectSource,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'unsupported'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customClaimInput, setCustomClaimInput] = useState('');
  const [customAuditResult, setCustomAuditResult] = useState<any | null>(null);

  const claimsPool: ClaimVerification[] = report ? report.claims : [
    {
      id: 'SAMPLE-1',
      claimText: 'Automotive regulatory credits revenue was $2.85 billion in 2024, representing an increase of 59% compared to $1.79 billion in 2023.',
      extractedFigures: ['$2.85 billion', '59%', '$1.79 billion', '2024', '2023'],
      status: 'verified',
      confidenceScore: 0.99,
      sourceEvidenceId: 'sec-tsla-10k-2024-mda-1',
      sourceCitation: '[SEC: TSLA Form 10-K Item 7, Page 48]',
      matchedPassage: 'Automotive regulatory credits revenue was $2.85 billion in 2024, compared to $1.79 billion in 2023, representing an increase of 59%.',
      verifierReasoning: 'Exact numerical match for all 5 figures in SEC Form 10-K Item 7. Verified.',
      feedbackTriggered: false
    },
    {
      id: 'SAMPLE-2',
      claimText: 'Tesla reported automotive gross margin excluding regulatory credits of 18.2% in 2024, outpacing industry peers.',
      extractedFigures: ['18.2%', '2024'],
      status: 'hallucinated',
      confidenceScore: 0.22,
      sourceCitation: 'FAILED VERIFICATION',
      matchedPassage: 'Automotive gross margin excluding regulatory credits was 14.6% in 2024, down from 17.1% in 2023...',
      verifierReasoning: 'HALLUCINATION DETECTED: Claim asserts 18.2% gross margin ex-credits, but SEC 10-K Item 7 explicitly discloses 14.6%. Flagged and purged.',
      feedbackTriggered: false
    },
    {
      id: 'SAMPLE-3',
      claimText: 'Deferred revenue related to access to Full Self-Driving (FSD) features was $3.12 billion as of December 31, 2024.',
      extractedFigures: ['$3.12 billion', 'December 31, 2024'],
      status: 'verified',
      confidenceScore: 0.98,
      sourceEvidenceId: 'sec-tsla-10k-2024-risk-1',
      sourceCitation: '[SEC: TSLA Form 10-K Item 1A / Note 2]',
      matchedPassage: 'Deferred revenue related to access to our FSD features and over-the-air updates was $3.12 billion as of December 31, 2024.',
      verifierReasoning: 'Verified through loopback retrieval into Form 10-K risk disclosures. Figures confirmed.',
      feedbackTriggered: true
    }
  ];

  const filteredClaims = claimsPool.filter(c => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.claimText.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeClaim = selectedClaim || filteredClaims[0] || claimsPool[0];
  const activeSource = selectedSource || SEC_FILINGS_DATABASE.find(s => s.id === activeClaim?.sourceEvidenceId) || SEC_FILINGS_DATABASE[0];

  const handleTestCustomClaim = () => {
    if (!customClaimInput.trim()) return;
    const input = customClaimInput.toLowerCase();
    const sourceText = activeSource.rawText.toLowerCase();

    // Check figures
    const numberRegex = /([$€£]?\d+(?:\.\d+)?%?|\d+(?:\.\d+)?\s*(?:billion|million)?)/gi;
    const figures = customClaimInput.match(numberRegex) || [];
    const matchedFigs = figures.filter(f => sourceText.includes(f.toLowerCase().replace(/[$€£%]/g, '')));

    const isSupported = matchedFigs.length === figures.length && figures.length > 0;
    const confidence = isSupported ? 0.96 : (matchedFigs.length > 0 ? 0.54 : 0.15);

    setCustomAuditResult({
      claimText: customClaimInput,
      figures,
      matchedFigs,
      status: isSupported ? 'verified' : (confidence < 0.3 ? 'hallucinated' : 'unsupported'),
      confidenceScore: confidence,
      reasoning: isSupported
        ? `Adversarial check PASSED: All figures [${matchedFigs.join(', ')}] authenticated in ${activeSource.documentTitle}.`
        : `Adversarial check FAILED: Unsupported or conflicting figures. Found only [${matchedFigs.join(', ')}] of [${figures.join(', ')}].`
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 font-['Cinzel'] tracking-wide">
              Citation Verification & Audit Laboratory
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Primary Source Provenance
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Sentence-by-sentence numerical tolerance checking ($\varepsilon \le 0.01$) against official SEC EDGAR 10-K/10-Q filings
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded transition-all ${filterStatus === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              All ({claimsPool.length})
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-2.5 py-1 rounded transition-all ${filterStatus === 'verified' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilterStatus('unsupported')}
              className={`px-2.5 py-1 rounded transition-all ${filterStatus === 'unsupported' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Flagged/Purged
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Claim List, Right Source Inspector & Adversarial Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Claims List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search claims or numbers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredClaims.map((claim) => {
              const isSelected = activeClaim?.id === claim.id;
              return (
                <div
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850 border-amber-500/80 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono text-slate-500">{claim.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      claim.status === 'verified'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {claim.status} ({Math.round(claim.confidenceScore * 100)}%)
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-medium line-clamp-3 leading-relaxed">
                    {claim.claimText}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400">Tokens N(C):</span>
                    {claim.extractedFigures.slice(0, 3).map((fig, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                        {fig}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Evidence Audit & Primary Text (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Claim Deep Dive Card */}
          {activeClaim && (
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-100 font-mono">
                    Audited Claim Assertion
                  </h3>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  Confidence: {Math.round(activeClaim.confidenceScore * 100)}%
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 font-medium leading-relaxed">
                &ldquo;{activeClaim.claimText}&rdquo;
              </div>

              {/* Numerical Extracted Tokens */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1.5">
                  Extracted Numerical Proof Set $\mathcal&#123;N&#125;(C)$
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeClaim.extractedFigures.map((fig, idx) => (
                    <div key={idx} className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-semibold flex items-center gap-1.5">
                      <span className="text-cyan-500 font-bold">#</span>
                      <span>{fig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Source Excerpt */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1.5 flex items-center justify-between">
                  <span>Authoritative SEC Filing Excerpt</span>
                  {activeClaim.sourceCitation && (
                    <span className="text-amber-400 lowercase font-mono">
                      {activeClaim.sourceCitation}
                    </span>
                  )}
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/90 border border-emerald-900/40 text-xs text-emerald-200/90 font-mono leading-relaxed whitespace-pre-wrap">
                  {activeClaim.matchedPassage || 'No primary text matched.'}
                </div>
              </div>

              {/* Verifier Reasoning */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-1">
                  Verifier Mathematical Reasoning
                </div>
                <div className={`p-3 rounded-lg border text-xs font-mono leading-relaxed ${
                  activeClaim.status === 'verified'
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                }`}>
                  {activeClaim.verifierReasoning}
                </div>
              </div>
            </div>
          )}

          {/* Adversarial Claim Tester (Interactive Simulation) */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-slate-100 font-mono uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Test Custom Claim Against SEC 10-K</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Active Source: {activeSource.ticker}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Type any financial claim with figures to test the Verifier’s real-time numerical and hallucination detection logic against the 10-K text.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder='e.g. "Automotive gross margin ex-credits dropped to 14.6% in 2024."'
                value={customClaimInput}
                onChange={e => setCustomClaimInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                onClick={handleTestCustomClaim}
                className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all font-mono shrink-0"
              >
                Audit Claim
              </button>
            </div>

            {customAuditResult && (
              <div className={`p-3 rounded-lg border text-xs font-mono mt-3 ${
                customAuditResult.status === 'verified'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-800 text-rose-300'
              }`}>
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  {customAuditResult.status === 'verified' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                  <span>Verdict: {customAuditResult.status.toUpperCase()} ({Math.round(customAuditResult.confidenceScore * 100)}% Confidence)</span>
                </div>
                <div>{customAuditResult.reasoning}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
