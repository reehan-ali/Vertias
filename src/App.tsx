import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResearchTerminal } from './components/ResearchTerminal';
import { AgentGraphVisualizer } from './components/AgentGraphVisualizer';
import { ClaimAuditDrawer } from './components/ClaimAuditDrawer';
import { BenchmarkDashboard } from './components/BenchmarkDashboard';
import { PromptSchemaViewer } from './components/PromptSchemaViewer';
import { ReportSynchronizer } from './components/ReportSynchronizer';
import { orchestrator } from './engine/orchestrator';
import { AgentStepTrace, AgentType, ClaimVerification, SourceEvidence, VeritasReport } from './types/veritas';
import { SEC_FILINGS_DATABASE } from './data/secFilingsDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'dag' | 'audit' | 'benchmark' | 'schemas' | 'thesis'>('terminal');
  const [selectedTicker, setSelectedTicker] = useState<string>('TSLA');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [traces, setTraces] = useState<AgentStepTrace[]>([]);
  const [report, setReport] = useState<VeritasReport | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<ClaimVerification | null>(null);
  const [selectedSource, setSelectedSource] = useState<SourceEvidence | null>(null);
  const [feedbackLoopActive, setFeedbackLoopActive] = useState<boolean>(false);

  // Run pipeline function
  const handleRunPipeline = async (ticker: string, query: string, simulateFeedbackLoop: boolean = true) => {
    setIsExecuting(true);
    setTraces([]);
    setActiveAgent('planner');
    setFeedbackLoopActive(false);

    try {
      const generatedReport = await orchestrator.runPipeline({
        ticker,
        query,
        simulateFeedbackLoop,
        onStepProgress: (trace: AgentStepTrace) => {
          setTraces(prev => [...prev, trace]);
          setActiveAgent(trace.agent);
          if (trace.status === 'loopback') {
            setFeedbackLoopActive(true);
          }
        }
      });

      setReport(generatedReport);
      if (generatedReport.claims.length > 0) {
        setSelectedClaim(generatedReport.claims[0]);
      }
      if (generatedReport.sources.length > 0) {
        setSelectedSource(generatedReport.sources[0]);
      }
    } catch (err) {
      console.error('Pipeline error:', err);
    } finally {
      setIsExecuting(false);
      setActiveAgent(null);
    }
  };

  // Run initial demo on first mount
  useEffect(() => {
    handleRunPipeline(
      'TSLA',
      "Analyze Tesla's automotive gross margin excluding regulatory credits, regulatory credit dependence, and FSD robotaxi regulatory risks.",
      true
    );
  }, []);

  const handleRunDemo = (ticker: string) => {
    setSelectedTicker(ticker);
    let q = "Analyze automotive gross margin and regulatory disclosures.";
    if (ticker === 'NVDA') {
      q = "Audit NVIDIA's FY2025 Data Center revenue explosion against single-source TSMC CoWoS packaging bottlenecks.";
    } else if (ticker === 'AAPL') {
      q = "Compare Apple's Services gross margin (74%) with Products gross margin, and analyze EU DMA antitrust risks.";
    } else if (ticker === 'MSFT') {
      q = "What percentage points did Azure AI contribute to Azure's 30% growth in FY24, and how does that justify the $55.7B capital expenditure commitments?";
    }
    handleRunPipeline(ticker, q, true);
  };

  const handleSelectClaim = (claim: ClaimVerification) => {
    setSelectedClaim(claim);
    if (claim.sourceEvidenceId) {
      const matched = SEC_FILINGS_DATABASE.find(s => s.id === claim.sourceEvidenceId);
      if (matched) setSelectedSource(matched);
    }
    setActiveTab('audit');
  };

  const handleSelectSource = (source: SourceEvidence) => {
    setSelectedSource(source);
    setActiveTab('audit');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExecuting={isExecuting}
        onRunDemo={handleRunDemo}
        activeTicker={selectedTicker}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'terminal' && (
          <ResearchTerminal
            onRunPipeline={handleRunPipeline}
            isExecuting={isExecuting}
            activeAgent={activeAgent}
            traces={traces}
            report={report}
            onSelectClaim={handleSelectClaim}
            onSelectSource={handleSelectSource}
            selectedTicker={selectedTicker}
            setSelectedTicker={setSelectedTicker}
          />
        )}

        {activeTab === 'dag' && (
          <AgentGraphVisualizer
            traces={traces}
            isExecuting={isExecuting}
            activeAgent={activeAgent}
            feedbackLoopActive={feedbackLoopActive}
          />
        )}

        {activeTab === 'audit' && (
          <ClaimAuditDrawer
            report={report}
            selectedClaim={selectedClaim}
            selectedSource={selectedSource}
            onSelectClaim={handleSelectClaim}
            onSelectSource={handleSelectSource}
          />
        )}

        {activeTab === 'benchmark' && (
          <BenchmarkDashboard />
        )}

        {activeTab === 'schemas' && (
          <PromptSchemaViewer />
        )}

        {activeTab === 'thesis' && (
          <ReportSynchronizer />
        )}
      </main>

      {/* Footer / Academic Attribution */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VERITAS — Autonomous Market Intelligence & Citation-Verified Financial Reporting</span>
          <span>B.Tech in Artificial Intelligence & Data Science (August 2026)</span>
        </div>
      </footer>
    </div>
  );
}
