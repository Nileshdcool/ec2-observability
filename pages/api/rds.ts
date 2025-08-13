import { NextApiRequest, NextApiResponse } from 'next';
import { rdsInstances } from '../../mock-data/rds';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(rdsInstances);
}
