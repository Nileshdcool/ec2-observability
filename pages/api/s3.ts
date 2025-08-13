import { NextApiRequest, NextApiResponse } from 'next';
import { s3Buckets } from '../../mock-data/s3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(s3Buckets);
}
