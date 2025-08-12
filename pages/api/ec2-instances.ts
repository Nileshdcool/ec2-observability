import type { NextApiRequest, NextApiResponse } from 'next';
import { instances } from '../../mock-data/ec2Instances';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(instances);
  } catch (error) {
    console.error('Error in ec2-instances API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
