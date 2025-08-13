import { LambdaFunction } from '../types/lambda';

export const lambdaFunctions: LambdaFunction[] = [
  {
    name: 'image-processor',
    region: 'us-east-1',
    invocations: 12000,
    errors: 12,
    cost: 15.2,
    avgDurationMs: 250,
    memoryMb: 512,
    createdAt: '2024-02-01T14:00:00Z',
  },
  {
    name: 'data-sync',
    region: 'us-west-2',
    invocations: 8000,
    errors: 2,
    cost: 8.5,
    avgDurationMs: 180,
    memoryMb: 256,
    createdAt: '2024-04-10T11:00:00Z',
  },
];
