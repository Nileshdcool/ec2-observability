import { utilizationData } from "@/mock-data/utilizationData";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(utilizationData);
  } catch (error) {
    console.error('Error in utilization API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
