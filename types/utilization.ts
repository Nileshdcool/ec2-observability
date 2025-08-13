// Utilization related types

export interface UtilizationData {
  instanceId: string;
  cpu: number;
  memory: number;
  timestamp: string;
  [key: string]: any;
}
