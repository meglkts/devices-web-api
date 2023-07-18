export interface Device {
  id: string;
  readings: Reading[];
}

export interface Reading {
  timestamp: Date;
  count: number;
}
