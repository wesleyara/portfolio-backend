// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const nodeEnv = process.env.NODE_ENV;
  const nodeVersion = process.versions.node;

  res.status(200).json({
    message: "Server is running.",
    status: {
      code: 200,
      node_env: nodeEnv,
      node_version: nodeVersion,
    },
  });
}
