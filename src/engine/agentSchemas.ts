export interface AgentSpecification {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  inputSchema: {
    description: string;
    example: Record<string, any>;
  };
  outputSchema: {
    description: string;
    example: Record<string, any>;
  };
  mathematicalRules?: string[];
  failureModesAndMitigations: {
    failureMode: string;
    mitigation: string;
  }[];
}

export const AGENT_SPECIFICATIONS: Record<string, AgentSpecification> = {
  planner: {
    id: 'planner',
    name: 'Planner Agent',
    role: 'Decompose natural-language financial research goal into verifiable, structured sub-questions.',
    systemPrompt: `You are the Senior Research Director for VERITAS, an institutional market intelligence system.
Your goal is to parse an investor research objective and decompose it into 4-6 orthogonal, empirical sub-questions.
Rules:
1. Avoid vague qualitative queries. Formulate questions that demand verifiable financial disclosures:
   - Margin breakdowns (GAAP vs non-GAAP, ex-credits)
   - Segment revenue and operating income disclosures
   - Item 1A legal & regulatory risk disclosures from Form 10-K
   - Real-time multiples (P/E, EV/EBITDA, Free Cash Flow yield)
2. Assign each sub-question a primary source category: 'SEC_EDGAR_10K', 'SEC_EDGAR_10Q', 'YFINANCE_MARKET', or 'FINANCIAL_NEWS'.
3. Formulate high-precision retrieval keywords with exact SEC filing items (e.g. "Item 7 MD&A", "Note 2 Revenue").`,
    inputSchema: {
      description: 'Raw investor research goal and company ticker symbol.',
      example: {
        ticker: 'TSLA',
        researchGoal: "Analyze Tesla's margin sustainability in the EV price war, regulatory credit dependence, and FSD robotaxi regulatory risks."
      }
    },
    outputSchema: {
      description: 'Structured research plan with prioritized sub-questions and target evidence sources.',
      example: {
        ticker: 'TSLA',
        primaryGoal: 'Analyze margin sustainability, regulatory credits, and FSD risk.',
        plannedScope: 'Form 10-K FY2024, FY2023 comps, real-time yfinance valuation, NHTSA regulatory filings',
        subQuestions: [
          {
            id: 'Q1',
            question: "What was Tesla's automotive gross margin excluding regulatory credits in 2024 vs 2023?",
            evidenceCategory: '10K_MDA',
            priority: 'HIGH',
            retrievalKeywords: ['Automotive regulatory credits', 'gross margin excluding regulatory credits', 'Item 7']
          },
          {
            id: 'Q2',
            question: 'What is the deferred revenue balance recognized for Full Self-Driving capabilities?',
            evidenceCategory: '10K_RISK_FACTORS',
            priority: 'HIGH',
            retrievalKeywords: ['Full Self-Driving', 'deferred revenue', 'Item 1A', 'NHTSA investigations']
          }
        ]
      }
    },
    failureModesAndMitigations: [
      {
        failureMode: 'Generating generic conversational questions (e.g., "Is Tesla doing well?")',
        mitigation: 'Strict schema enforcement requiring evidenceCategory and exact 10-K item keywords.'
      },
      {
        failureMode: 'Overly broad sub-questions spanning multiple reporting periods with ambiguous definitions',
        mitigation: 'Bounded temporal constraint to specific fiscal year (FY24 / FY25) and SEC accession metadata.'
      }
    ]
  },

  retriever: {
    id: 'retriever',
    name: 'Retriever Agent',
    role: 'Fetch primary-source SEC filings, live financial multiples, and timely news articles.',
    systemPrompt: `You are the Chief Data Officer and Document Retrieval Engine of VERITAS.
Your responsibility is to pull raw, unedited, authoritative evidence corresponding to each sub-question from:
1. SEC EDGAR full-text API (Form 10-K, Form 10-Q): CIK lookup, Item 1A, Item 7, Notes to Consolidated Financial Statements.
2. Structured market data (yfinance): Price, market cap, P/E, EV/EBITDA, gross margin, operating margin, free cash flow.
3. Financial news feed: Verified business publications (Bloomberg, Reuters, WSJ, CNBC).
Rules:
- Preserve verbatim text excerpts, filing accession numbers, and exact filing dates.
- Never summarize or hallucinate missing data. If a specific metric is absent from the filing, output an explicit null/missing flag so the Verifier can request secondary retrieval.`,
    inputSchema: {
      description: 'Research sub-questions with targeted keyword parameters and source types.',
      example: {
        ticker: 'TSLA',
        subQuestions: ['Q1: Automotive gross margin ex-credits', 'Q2: FSD deferred revenue']
      }
    },
    outputSchema: {
      description: 'Indexed raw text snippets with exact provenance and metadata.',
      example: {
        retrievedDocuments: [
          {
            id: 'sec-tsla-10k-2024-mda-1',
            sourceType: 'SEC_EDGAR_10K',
            accessionNumber: '0001318605-25-000012',
            section: 'Item 7 MD&A',
            rawText: 'Automotive regulatory credits revenue was $2.85 billion in 2024... Automotive gross margin excluding regulatory credits was 14.6%...'
          }
        ]
      }
    },
    failureModesAndMitigations: [
      {
        failureMode: 'HTML/XBRL parsing corruption in SEC filing tables',
        mitigation: 'Regex-based text normalization and normalized whitespace stripping preserving table cells.'
      },
      {
        failureMode: 'NewsAPI rate limit exhaustion',
        mitigation: 'Deterministic local cache with instant offline fallback and automated cache invalidation.'
      }
    ]
  },

  analyzer: {
    id: 'analyzer',
    name: 'Analyzer Agent',
    role: 'Synthesize raw retrieved evidence into analytical claims and financial metrics.',
    systemPrompt: `You are the Lead Financial Analyst of VERITAS.
Your role is to evaluate the raw retrieved evidence from SEC EDGAR and market fundamentals, and formulate precise draft claims.
Requirements:
1. Every claim must cite the specific document ID from which its figures originate.
2. Formulate empirical statements with explicit numbers: percentages, dollar amounts, and year-over-year deltas.
3. Separate factual observations from analytical interpretations.
4. Prepare claims for strict verification: do not extrapolate beyond the retrieved text passages.`,
    inputSchema: {
      description: 'Raw retrieved text passages and structured financial profile.',
      example: {
        ticker: 'TSLA',
        evidenceCount: 3,
        marketData: { peRatio: 64.2, grossMargin: '18.2%' }
      }
    },
    outputSchema: {
      description: 'Structured analytical claims accompanied by preliminary source references.',
      example: {
        draftClaims: [
          {
            id: 'claim-1',
            text: 'Tesla recognized $2.85 billion in regulatory credit revenue in 2024, representing a 59% increase over 2023.',
            extractedFigures: ['$2.85 billion', '59%', '2024', '2023'],
            tentativeSourceId: 'sec-tsla-10k-2024-mda-1'
          }
        ]
      }
    },
    failureModesAndMitigations: [
      {
        failureMode: 'Analyst extrapolating unsubstantiated growth estimates',
        mitigation: 'Strict instruction to bound all draft claims directly to the provided evidence payload.'
      }
    ]
  },

  verifier: {
    id: 'verifier',
    name: 'Verifier Agent (Core Innovation)',
    role: 'Audit every draft claim against the underlying source text. Flag unsupported claims and execute feedback loop.',
    systemPrompt: `You are the Chief Auditor and Verifier of VERITAS. You represent the primary safeguard against AI hallucination in financial reporting.
Your mandate is adversarial verification: assume every draft claim is false until proven true against the exact source text.

VERIFICATION PROTOCOL:
1. FIGURE EXTRACTION:
   Extract all numerical tokens N(C) = {numbers, percentages, dates, dollar values} from the claim.
2. NUMERICAL TOLERANCE AUDIT:
   Check if each extracted figure n in N(C) appears verbatim or within a strictly normalized tolerance (|n_claim - n_source| / |n_source| <= 0.01) in the referenced source passage.
3. SEMANTIC ENTAILMENT TEST:
   Compute semantic support. Does the source passage logically entail the claim, or does it merely mention the topic?
4. CLASSIFICATION:
   - 'verified': Confidence score >= 0.85, all figures supported in source. Attach permanent citation [SEC-10K §X].
   - 'unsupported': Confidence score < 0.85, figures absent or unverified. FLAG FOR LOOPBACK.
   - 'hallucinated': Explicit contradiction between claim figures and source figures (e.g. claim says 18.5%, source states 14.6%). PURGE and mark hallucination.
5. FEEDBACK LOOP DECISION:
   If critical claims are marked 'unsupported' and feedbackLoopsExecuted < 2, formulate a targeted delta-query to the Retriever to fetch missing primary documents.`,
    inputSchema: {
      description: 'Draft claims paired with source evidence passages.',
      example: {
        claims: [{ id: 'claim-1', text: 'Tesla automotive gross margin ex-credits was 14.6% in 2024.' }],
        sourceEvidence: [{ id: 'sec-tsla-10k-2024-mda-1', rawText: 'Automotive gross margin excluding regulatory credits was 14.6% in 2024...' }]
      }
    },
    outputSchema: {
      description: 'Audit verdicts, confidence scores, citation anchors, and feedback loop directives.',
      example: {
        verdict: 'PARTIAL_SUPPORT',
        feedbackTriggered: true,
        feedbackQuery: 'Retrieve Tesla 10-K deferred revenue note 2',
        verifiedClaims: [
          {
            id: 'claim-1',
            status: 'verified',
            confidenceScore: 0.99,
            citation: '[SEC: TSLA Form 10-K Item 7, Page 48]',
            verifierReasoning: 'Exact numerical match for 14.6% automotive gross margin ex-credits.'
          }
        ]
      }
    },
    mathematicalRules: [
      'Token Extraction: N(C) = { n in Claim | n matches ([$€£]?[0-9]+(\\.[0-9]+)?(%|B|M|k)?) }',
      'Numerical Grounding: For all n in N(C), exists e in Source such that |n - e| / |e| <= 0.01 (allowing for scale prefixes B, M)',
      'Jaccard Lexical Overlap: J(Claim, Passage) = |W(Claim) ∩ W(Passage)| / |W(Claim) ∪ W(Passage)|',
      'Confidence Function: S(C, E) = 0.5 * NumericalGrounding + 0.3 * Entailment + 0.2 * JaccardOverlap',
      'Feedback Boundary: If S(C, E) < 0.85 and FeedbackLoops < 2 => Trigger Retriever Feedback Loop'
    ],
    failureModesAndMitigations: [
      {
        failureMode: 'False positive on partial entity match (e.g. claiming GAAP operating margin when text discusses non-GAAP)',
        mitigation: 'Contextual GAAP/Non-GAAP qualifier token requirement.'
      },
      {
        failureMode: 'False negative due to phrasing variance (e.g. "$2.85 billion" vs "2,850 million")',
        mitigation: 'Standardized financial magnitude normalization ($B, $M, $K -> standard floating point integer).'
      }
    ]
  },

  generator: {
    id: 'generator',
    name: 'Report Generator',
    role: 'Compile only verified, citation-anchored claims into an institutional equity research report.',
    systemPrompt: `You are the Managing Director of Institutional Research at VERITAS.
Your mandate is to assemble the final, audit-grade research memo from verified claims.
Rules:
1. Strict Exclusion: NEVER include claims flagged as 'hallucinated' or 'unsupported'.
2. Inline Provenance: Every single quantitative statement must carry an inline bracketed citation tag (e.g., [SEC-10K §7], [MKT-DATA], [NEWS]).
3. Confidence Metric: Compute and prominently display the Aggregate Report Verification Score (%).
4. Structured Formatting:
   - Executive Thesis & Key Catalyst Summary
   - Operational & Margin Dynamics (GAAP vs ex-credit analysis)
   - Segment Breakdown & Capital Allocation
   - Regulatory, Supply Chain & Legal Risk Assessment
   - Source Audit Appendix with clickable filing references.`,
    inputSchema: {
      description: 'Set of verified claims, source evidence, and structured market data.',
      example: {
        verifiedClaimsCount: 14,
        overallConfidence: 0.984,
        ticker: 'TSLA'
      }
    },
    outputSchema: {
      description: 'Complete institutional equity research report object ready for rendering and export.',
      example: {
        reportId: 'REP-TSLA-202502',
        title: 'TESLA, INC. (NASDAQ: TSLA) — Institutional Research & Margin Verification Memo',
        overallConfidenceScore: 98.4,
        sections: [
          { title: 'Executive Summary', content: 'Tesla operates with an automotive gross margin ex-credits of 14.6%...' }
        ]
      }
    },
    failureModesAndMitigations: [
      {
        failureMode: 'Re-introducing unverified embellishments during stylistic generation',
        mitigation: 'Strict post-generation claim token alignment pass.'
      }
    ]
  }
};
