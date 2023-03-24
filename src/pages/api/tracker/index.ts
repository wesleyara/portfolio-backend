import { prisma } from "@/services/prisma";
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["POST", "GET"],
  origin: process.env.ORIGIN_URL,
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { name } = req.body;

    const existsTracker = await prisma.tracker.findUnique({
      where: {
        name,
      },
    });

    if (existsTracker) {
      const tracker = await prisma.tracker.update({
        where: {
          name,
        },
        data: {
          name,
          count: existsTracker.count + 1,
        },
      });

      return res.json(tracker);
    }

    const tracker = await prisma.tracker.create({
      data: {
        name,
        count: 1,
      },
    });

    res.json(tracker);
  } else if (req.method === "GET") {
    const users = await prisma.tracker.findMany();

    res.json(users);
  }
}
