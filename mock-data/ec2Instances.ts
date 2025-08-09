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

export const instances: EC2Instance[] = [
  {
    id: "i-12345",
    name: "Compute-Node-1",
    region: "us-east-1",
    type: "c5.2xlarge",
    cpu: 8,
    ram: 16,
    gpu: 0,
    uptime: 144,
    costPerHour: 0.4,
    owner: "Team Bio",
    jobId: "JOB-001"
  },
];
