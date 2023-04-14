import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ThreadCreateSchema } from "@/lib/schemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  console.log("running");

  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "POST") {
    const parsedBody = ThreadCreateSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    try {
      const thread = await prisma.thread.create({
        data: {
          title: parsedBody.data.title,
          authorId: session.user.id,
          tweets: {
            create: parsedBody.data.tweets.map((tweet) => ({
              content: tweet.content,
            })),
          },
        },
        select: {
          id: true,
        },
      });

      res.status(201).json(thread);
    } catch (error) {
      res.status(500).json({ error: "Couldn't create thread" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default handler;
