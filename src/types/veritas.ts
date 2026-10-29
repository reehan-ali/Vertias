export type AgentType = 'planner' | 'retriever' | 'analyzer' | 'verifier' | 'generator';

export type ClaimStatus = 'verified' | 'unsupported' | 'hallucinated' | 'pending';

export interface TextChunk {
  id: string;
  sourceId: string;
  ticker: string;
  documentTitle: string;
  section: string;
  chunkIndex: number;
  content: string;
  relevanceScore?: number;
  metadata?: {
    filingDate?: string;
    accessionNumber?: string;
    url?: string;
  };
}

export interface SourceEvidence {
  id: string;
  sourceType: 'SEC_EDGAR_10K' | 'SEC_EDGAR_10Q' | 'YFINANCE_MARKET' | 'FINANCIAL_NEWS';
  ticker: string;
  documentTitle: string;
  filingDate: string;
  accessionNumber?: string;
  section: string;
  url?: string;
  rawText: string;
  metadata?: Record<string, any>;
}

export interface ClaimVerification {
  id: string;
  claimText: string;
  extractedFigures: string[];
  status: ClaimStatus;
  confidenceScore: number; // 0.0 to 1.0
  sourceEvidenceId?: string;
  sourceCitation?: string;
  matchedPassage?: string;
  verifierReasoning: string;
  feedbackTriggered: boolean;
  secondaryRetrievedPassage?: string;
  discrepancyDelta?: string;
}

export interface ResearchPlan {
  ticker: string;
  primaryGoal: string;
  subQuestions: {
    id: string;
    question: string;
    evidenceCategory: '10K_RISK_FACTORS' | '10K_MDA' | 'BALANCE_SHEET' | 'MARKET_DATA' | 'NEWS_CATALYST';
    priority: 'HIGH' | 'MEDIUM';
    retrievalKeywords: string[];
  }[];
  plannedScope: string;
}

export interface AgentStepTrace {
  agent: AgentType;
  stepNumber: number;
  status: 'running' | 'completed' | 'loopback' | 'failed';
  title: string;
  latencyMs: number;
  timestamp: string;
  inputSummary: string;
  outputSummary: string;
  details?: any;
}

// Shared Context Object across agents
export interface ResearchContext {
  sessionId: string;
  goal: string;
  ticker: string;
  plan?: ResearchPlan;
  retrievedChunks: TextChunk[];
  draftClaims: {
    id: string;
    text: string;
    tentativeSourceId: string;
    extractedFigures: string[];
  }[];
  verifiedClaims: ClaimVerification[];
  retryCount: number;
  maxRetries: number;
  traceLogs: AgentStepTrace[];
  marketDataSnapshot?: any;
  liveNewsArticles?: any[];
}

export interface VeritasReport {
  id: string;
  ticker: string;
  companyName: string;
  title: string;
  generatedAt: string;
  overallConfidenceScore: number; // e.g. 96.4%
  claimsTotal: number;
  claimsVerified: number;
  claimsFlagged: number;
  feedbackLoopsExecuted: number;
  summaryThesis: string;
  sections: {
    title: string;
    content: string;
    citedClaimIds: string[];
  }[];
  claims: ClaimVerification[];
  sources: SourceEvidence[];
  marketSnapshot: {
    currentPrice: number;
    currency: string;
    marketCap: string;
    peRatio: number;
    grossMargin: string;
    operatingMargin: string;
    freeCashFlow: string;
    filingDate: string;
    isLiveFeed?: boolean;
  };
}

export interface BenchmarkQuery {
  id: string;
  ticker: string;
  query: string;
  groundTruthClaim: string;
  groundTruthSource: string;
  category: 'Margin Divergence' | 'Regulatory Exposure' | 'Capex ROI' | 'Revenue Segments' | 'Moat & Market Share';
  singleShotBaseline: {
    accuracyScore: number;
    hallucinationRate: number;
    hasCitations: boolean;
    hallucinatedClaimSample: string;
    latencySeconds: number;
    estimatedCostUsd: number;
  };
  veritasMultiAgent: {
    accuracyScore: number;
    hallucinationRate: number;
    hasCitations: boolean;
    verifiedClaimSample: string;
    latencySeconds: number;
    estimatedCostUsd: number;
    feedbackLoopsRun: number;
  };
}
