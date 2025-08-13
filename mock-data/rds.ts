import { RDSInstance } from '../types/rds';

export const rdsInstances: RDSInstance[] = [
  {
    id: 'rds-1',
    name: 'prod-db',
    engine: 'postgres',
    status: 'available',
    region: 'us-east-1',
    cost: 120.5,
    cpuUtilization: 35,
    storage: 200,
    storageUsed: 150,
    connections: 42,
    createdAt: '2024-01-10T12:00:00Z',
  },
  {
    id: 'rds-2',
    name: 'dev-db',
    engine: 'mysql',
    status: 'stopped',
    region: 'us-west-2',
    cost: 45.2,
    cpuUtilization: 0,
    storage: 100,
    storageUsed: 0,
    connections: 0,
    createdAt: '2024-03-15T09:00:00Z',
  },
];
