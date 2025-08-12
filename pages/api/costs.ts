import type { NextApiRequest, NextApiResponse } from 'next';
import { costOverview, attribution } from '../../mock-data/costs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ costOverview, attribution });
  } catch (error) {
    console.error('Error in costs API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
