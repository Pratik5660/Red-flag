export type FiscalYear = 'FY22' | 'FY23' | 'FY24' | 'FY25' | 'FY26';

export type FlagLevel = 'GREEN' | 'YELLOW' | 'RED' | 'NEUTRAL';

export type FlagState = 'Computed' | 'Uncomputed' | 'Data Insufficient';

export type FlagTrend = 'improving' | 'stable' | 'deteriorating';

export type FlagCategory = 
  | 'Gating' 
  | 'Revenue' 
  | 'Expense' 
  | 'Working Capital' 
  | 'Cash Flow' 
  | 'Governance';

export interface ForensicFlag {
  id: string; // e.g. "RF-01"
  name: string;
  category: FlagCategory;
  isGating: boolean; // True for [GATE] flags
  state: FlagState;
  level: FlagLevel;
  currentValue: string; // e.g. "1.2% (Low Risk)"
  historicalValues: Record<FiscalYear, string | number>;
  trend: FlagTrend;
  threshold: string;
  formula: string;
  citation: string; // Exact SEC 10-K accession & footnote
  secItem: string; // e.g. "Item 8 - Note 3"
  forensicAnalysis: string; // In-depth auditor interpretation
  riskWeight: number; // 1-10 scale
}

export interface CompanyProfile {
  ticker: string;
  name: string;
  cik: string;
  exchange: string;
  sector: string;
  industry: string;
  auditor: string;
  auditOpinion: string;
  keyAuditMatters: string[];
  fiscalYearEnd: string;
  secFilingDate: string;
  accessionNumber: string;
  description: string;
}

export interface LiveMarketData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number; // in Billions
  enterpriseValue: number; // in Billions
  peRatio: number;
  forwardPe: number;
  evEbitda: number;
  sharesOutstanding: number; // in Billions
  volume24h: string;
  high52w: number;
  low52w: number;
  lastReconciledTimestamp: string;
  reconciliationSource: string;
}

export interface FinancialStatementRow {
  id: string;
  label: string;
  category: 'Income' | 'Balance Sheet' | 'Cash Flow' | 'Ratio';
  unit: string;
  values: Record<FiscalYear, number>;
  secCitation: string;
  isAnomaly?: boolean;
  anomalyNote?: string;
}

export interface CompanyForensicReport {
  profile: CompanyProfile;
  marketData: LiveMarketData;
  financialRows: FinancialStatementRow[];
  flags: ForensicFlag[];
  healthScore: number;
  gatingPassed: boolean;
  gatingNotes: string;
  coverageRatio: number; // computed vs total flags
  computedCount: number;
  uncomputedCount: number;
  greenCount: number;
  yellowCount: number;
  redCount: number;
}

export interface UserSession {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
    role: string;
    organization: string;
    avatarUrl?: string;
  } | null;
  token: string | null;
}
