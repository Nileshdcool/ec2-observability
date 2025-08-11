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
  {
    id: "i-67890",
    name: "ML-Node-2",
    region: "us-west-2",
    type: "p3.8xlarge",
    cpu: 32,
    ram: 244,
    gpu: 4,
    uptime: 72,
    costPerHour: 3.06,
    owner: "Team ML",
    jobId: "JOB-002"
  },
  {
    id: "i-54321",
    name: "Data-Node-3",
    region: "eu-central-1",
    type: "r5.4xlarge",
    cpu: 16,
    ram: 128,
    gpu: 0,
    uptime: 200,
    costPerHour: 1.008,
    owner: "Team Data",
    jobId: "JOB-003"
  },
  {
    id: "i-98765",
    name: "General-Node-4",
    region: "ap-southeast-1",
    type: "m5.large",
    cpu: 2,
    ram: 8,
    gpu: 0,
    uptime: 300,
    costPerHour: 0.096,
    owner: "Team Bio",
    jobId: "JOB-004"
  },
  {
    id: "i-11223",
    name: "GPU-Node-5",
    region: "us-east-1",
    type: "g4dn.xlarge",
    cpu: 4,
    ram: 16,
    gpu: 1,
    uptime: 50,
    costPerHour: 0.526,
    owner: "Team ML",
    jobId: "JOB-005"
  }
];
