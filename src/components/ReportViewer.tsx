import React, { useState } from 'react';
import { VeritasReport, ClaimVerification, SourceEvidence } from '../types/veritas';
import { ShieldCheck, Download, Copy, Check, ExternalLink, AlertTriangle, FileText, ArrowRight, CornerDownRight } from 'lucide-react';

interface ReportViewerProps {
  report: VeritasReport | null;
  isExecuting?: boolean;
  onSelectClaim: (claim: ClaimVerification) => void;
  onSelectSource: (source: SourceEvidence) => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  isExecuting = false,
  onSelectClaim,
  onSelectSource,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  if (isExecuting) {
    return (
      <div className="h-full min-h-[420px] flex flex-col items-center justify-center p-8 text-center border border-amber-500/40 rounded-xl bg-slate-900/60 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          VERITAS MULTI-AGENT PIPELINE EXECUTING
        </div>
        <h3 className="text-base font-bold text-slate-100 font-['Cinzel'] tracking-wide">
          Synthesizing & Auditing Financial Research
        </h3>
        <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed font-sans">
          Retrieving official SEC Form 10-K primary texts, performing sliding-window semantic chunking, and checking claim numerical tolerance ($\varepsilon \le 0.01$)...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
        <FileText className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-base font-semibold text-slate-300">No Research Report Generated Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Select a research prompt or company ticker above and click &quot;Launch Research&quot; or press Enter to execute the pipeline.
        </p>
      </div>
    );
  }

  const handleCopyMarkdown = () => {
    let md = `# ${report.title}\n`;
    md += `**Overall Verification Confidence:** ${report.overallConfidenceScore}%\n`;
    md += `**Generated At:** ${new Date(report.generatedAt).toLocaleString()}\n\n`;
    md += `## Market Snapshot\n`;
    md += `- Price: $${report.marketSnapshot.currentPrice} | Market Cap: ${report.marketSnapshot.marketCap} | P/E: ${report.marketSnapshot.peRatio}x\n`;
    md += `- Gross Margin: ${report.marketSnapshot.grossMargin} | Operating Margin: ${report.marketSnapshot.operatingMargin} | FCF: ${report.marketSnapshot.freeCashFlow}\n\n`;
    md += `## Executive Summary\n${report.summaryThesis}\n\n`;
    report.sections.forEach(sec => {
      md += `## ${sec.title}\n${sec.content}\n\n`;
    });
    md += `## Sources & Audit Provenance\n`;
    report.sources.forEach(src => {
      md += `- ${src.documentTitle} (${src.section}) [${src.filingDate}]\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Memo Top Meta Bar */}
      <div className="border-b border-slate-800 bg-slate-950/70 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {report.ticker}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SEC Accession Verified
            </span>
            <span className="text-xs text-slate-600">•</span>
            <span className="text-xs text-slate-400">
              {new Date(report.generatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 mt-1 font-['Cinzel'] tracking-wide">
            {report.companyName} Institutional Research Memo
          </h2>
        </div>

        {/* Confidence Badge & Actions */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase font-mono text-emerald-400 font-semibold tracking-wider">
                Verification Score
              </div>
              <div className="text-sm font-mono font-bold text-emerald-300">
                {report.overallConfidenceScore}% AUDITED
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyMarkdown}
              title="Copy Markdown Report"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline text-xs">Copy MD</span>
            </button>
            <button
              onClick={handlePrint}
              title="Print or Save PDF"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Print/PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-4 bg-slate-950/40 border-b border-slate-800/80 font-mono text-xs">
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Current Price</div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            ${report.marketSnapshot.currentPrice.toFixed(2)}
          </div>
        </div>
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Market Cap</div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            {report.marketSnapshot.marketCap}
          </div>
        </div>
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">P/E Ratio</div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            {report.marketSnapshot.peRatio}x
          </div>
        </div>
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Gross Margin</div>
          <div className="text-sm font-semibold text-emerald-400 mt-0.5">
            {report.marketSnapshot.grossMargin}
          </div>
        </div>
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Operating Margin</div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            {report.marketSnapshot.operatingMargin}
          </div>
        </div>
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Free Cash Flow</div>
          <div className="text-sm font-semibold text-amber-300 mt-0.5">
            {report.marketSnapshot.freeCashFlow}
          </div>
        </div>
      </div>

      {/* Verification Summary Banner */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 font-medium">
            ✓ {report.claimsVerified} of {report.claimsTotal} Claims Verified
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400">
            ↺ {report.feedbackLoopsExecuted} Autonomous Loopback(s) Executed
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            0 Hallucinations Permitted
          </span>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Click any citation tag to view primary SEC source
        </span>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-6 text-slate-200 leading-relaxed font-sans text-sm">
        {/* Executive Thesis */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span>Executive Synthesis & Audit Verdict</span>
            <span className="text-[10px] font-normal px-2 py-0.2 rounded bg-amber-500/10 text-amber-300">
              VERITAS Certified
            </span>
          </div>
          <p className="text-slate-300">
            {report.summaryThesis}
          </p>
        </div>

        {/* Report Sections */}
        {report.sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel'] tracking-wide border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>{sec.title}</span>
              <span className="text-xs font-mono text-slate-500 font-normal">
                Audited §{idx + 1}
              </span>
            </h3>
            <p className="text-slate-300 whitespace-pre-line leading-relaxed">
              {sec.content}
            </p>
          </div>
        ))}

        {/* Verified Claims Quick Inspector */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Underlying Claims & Verification Proofs ({report.claims.length})</span>
          </h4>

          <div className="space-y-2.5">
            {report.claims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => onSelectClaim(claim)}
                className="group p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-950 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {claim.status} ({Math.round(claim.confidenceScore * 100)}%)
                      </span>
                      {claim.feedbackTriggered && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                          Loopback Verified
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-500">{claim.id}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium group-hover:text-amber-200 transition-colors">
                      {claim.claimText}
                    </p>
                    {claim.sourceCitation && (
                      <div className="mt-1.5 text-[11px] font-mono text-amber-400/90 flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                        <span>Citation: {claim.sourceCitation}</span>
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Source References */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Primary Sources Consulted (SEC EDGAR & Markets)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {report.sources.map((src) => (
              <div
                key={src.id}
                onClick={() => onSelectSource(src)}
                className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-1">
                  <span className="font-bold">{src.sourceType}</span>
                  <span className="text-slate-500">{src.filingDate}</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {src.documentTitle}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {src.section}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
