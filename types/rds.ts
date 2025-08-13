export type RDSInstance = {
  id: string;
  name: string;
  engine: string;
  status: string;
  region: string;
  cost: number;
  cpuUtilization: number;
  storage: number;
  storageUsed: number;
  connections: number;
  createdAt: string;
};
