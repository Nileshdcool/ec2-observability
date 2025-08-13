// Cost related types

// Time series datum for cost attribution
export type TimeSeriesDatum = { time: string; cost: number };

// Attribution datum for cost attribution
export type AttributionDatum = { dimension: string; cost: number; timeSeries?: TimeSeriesDatum[] };

export interface CostAttribution {
  service: string;
  amount: number;
  date: string;
  [key: string]: any;
}

export interface CostOverview {
  total: number;
  breakdown: CostAttribution[];
}
