import { S3Bucket } from '../types/s3';

export const s3Buckets: S3Bucket[] = [
  {
    name: 'prod-assets',
    region: 'us-east-1',
    storage: 500,
    objects: 12000,
    cost: 30.1,
    createdAt: '2023-11-20T08:00:00Z',
  },
  {
    name: 'logs-archive',
    region: 'us-west-2',
    storage: 1200,
    objects: 500000,
    cost: 80.7,
    createdAt: '2022-07-01T10:00:00Z',
  },
];
