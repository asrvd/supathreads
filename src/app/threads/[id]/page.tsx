import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { SignIn } from "@/app/actions";
import { CopyButton } from "@/components/ui/buttons";

const ThreadSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  tweets: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
    })
  ),
});

async function getPageData(id: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You need to be logged in to access this page");
  }

  const data = await prisma.thread.findUnique({
    where: {
      id,
    },
    include: {
      tweets: true,
    },
  });

  const thread = ThreadSchema.safeParse(data);

  if (!thread.success) {
    throw new Error(thread.error.message);
  }

  return {
    thread: thread.data,
    session,
  };
}

export default async function Thread({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { thread, session } = await getPageData(params.id);

  return (
    <>
      {session?.user ? (
        <div className="lg:w-[56%] w-full p-4 my-6">
          <h2 className="text-3xl font-bold mb-4 w-full bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900">
            {thread.title}
          </h2>
          <div className="flex flex-col gap-4 w-full ">
            {thread.tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="p-4 pr-10 relative bg-zinc-200 rounded-md shadow-md border border-zinc-300/60"
              >
                <p className="text-zinc-900 text-base">{tweet.content}</p>
                <CopyButton text={tweet.content} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            You need to be logged in to create a thread
          </h2>
          <SignIn />
        </div>
      )}
    </>
  );
}
