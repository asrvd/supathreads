import ThreadForm from "@/components/thread-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SignIn } from "../actions";
import type { Metadata } from "next";

export const meta: Metadata = {
  title: "Create"
}

export default async function Create() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <ThreadForm />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <h2 className="text-2xl font-semibold text-zinc-950 mb-4">
            You need to be logged in to create a thread
          </h2>
          <SignIn />
        </div>
      )}
    </>
  );
}
