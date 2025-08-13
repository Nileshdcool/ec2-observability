export type LambdaFunction = {
  name: string;
  region: string;
  invocations: number;
  errors: number;
  cost: number;
  avgDurationMs: number;
  memoryMb: number;
  createdAt: string;
};
