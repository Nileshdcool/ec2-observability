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
  // Underused: cpu < 2, uptime > 24
  {
    id: "i-0a1b2c3d4e5f6g7h1",
    name: "Idle-Node",
    region: "us-east-1",
    type: "t3.micro",
    cpu: 1,
    ram: 2,
    gpu: 0,
    uptime: 48,
    costPerHour: 0.012,
    owner: "Team Idle",
    jobId: "job-20250811-001"
  },
  // Over-provisioned: cpu > 16, uptime < 24
  {
    id: "i-0a1b2c3d4e5f6g7h2",
    name: "Burst-Node",
    region: "us-west-2",
    type: "c5.9xlarge",
    cpu: 36,
    ram: 72,
    gpu: 0,
    uptime: 8,
    costPerHour: 2.0,
    owner: "Team Burst",
    jobId: "job-20250811-002"
  },
  // OK: neither underused nor over-provisioned
  {
    id: "i-0a1b2c3d4e5f6g7h3",
    name: "Balanced-Node",
    region: "eu-central-1",
    type: "m5.xlarge",
    cpu: 4,
    ram: 16,
    gpu: 0,
    uptime: 100,
    costPerHour: 0.192,
    owner: "Team Balanced",
    jobId: "job-20250811-003"
  },
  // Another Underused
  {
    id: "i-0a1b2c3d4e5f6g7h4",
    name: "Idle-Node-2",
    region: "ap-southeast-1",
    type: "t2.nano",
    cpu: 1,
    ram: 0.5,
    gpu: 0,
    uptime: 72,
    costPerHour: 0.005,
    owner: "Team Idle",
    jobId: "job-20250811-004"
  },
  // Another Over-provisioned
  {
    id: "i-0a1b2c3d4e5f6g7h5",
    name: "Burst-Node-2",
    region: "us-east-2",
    type: "r5.12xlarge",
    cpu: 48,
    ram: 384,
    gpu: 0,
    uptime: 10,
    costPerHour: 4.0,
    owner: "Team Burst",
    jobId: "job-20250811-005"
  }
];
