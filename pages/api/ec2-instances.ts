import type { NextApiRequest, NextApiResponse } from 'next';
import { instances } from '../../mock-data/ec2Instances';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(instances);
}
