export interface Device {
  id: string;
  readings: Reading[];
}

export interface Reading {
  timestamp: Date;
  count: number;
}

export interface ReadingFields {
  latest_timestamp?: string;
  cumulative_count?: number;
}

export type ReadingFieldOptions = "latest_timestamp" | "cumulative_count";
