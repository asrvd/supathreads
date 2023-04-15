import type { Thread } from "@prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { SignIn } from "../actions";

const ThreadSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.date(),
  })
);

async function getDashboardData() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You need to be logged in to access this page");
  }

  const data = await prisma.thread.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
  const threads = ThreadSchema.safeParse(data);

  if (!threads.success) {
    throw new Error("Invalid response from server");
  }

  return {
    threads: threads.data,
    session,
  };
}

export default async function Dashboard() {
  const { threads, session } = await getDashboardData();

  return (
    <>
      {session?.user ? (
        <div className="lg:w-[56%] w-full p-4 my-6">
          <h2 className="text-3xl font-bold w-full bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900 mb-4">
            Your Threads
          </h2>
          <div className="flex flex-col gap-4 w-full ">
            {threads?.map((thread) => (
              <div
                key={thread.id}
                className="p-4 bg-zinc-200 rounded-md shadow-md border border-zinc-300/60"
              >
                <a
                  className="text-lg font-semibold cursor-pointer text-zinc-950 hover:underline underline-offset-2"
                  href={`/threads/${thread.id}`}
                >
                  {thread.title}
                </a>
                <p className="text-zinc-700 mt-4 text-sm">
                  created {thread.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
            You need to be logged in to create a thread
          </h2>
          <SignIn />
        </div>
      )}
    </>
  );
}
