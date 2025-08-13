// EC2 instance related types

// Main EC2 instance type (from mock-data/ec2Instances.ts)
export interface EC2Instance {
  id: string;
  name: string;
  region: string;
  type: string;
  cpu: number;
  ram: number;
  gpu: number;
  uptime: number; // hours
  costPerHour: number;
  owner: string;
  jobId: string;
}

// Usage data for utilization timeline
export interface UsageDatum {
  time: string;
  cpu: number;
  ram: number;
  gpu?: number;
  instanceId?: string;
}

// Annotation for utilization timeline
export interface Annotation {
  time: string;
  cpu: number;
  label: string;
}
