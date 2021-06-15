// enums
export const enum Environment {
  LOCAL = "local",
}

export const enum LoggerLevel {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

// internal data structure

export interface Ticket {
  id: number;
  numbers: number[][];
  status: number | null;
  verified: boolean;
}
