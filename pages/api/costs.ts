import type { NextApiRequest, NextApiResponse } from 'next';
import { costOverview, attribution } from '../../mock-data/costs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ costOverview, attribution });
}
