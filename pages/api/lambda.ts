import { NextApiRequest, NextApiResponse } from 'next';
import { lambdaFunctions } from '../../mock-data/lambda';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(lambdaFunctions);
}
