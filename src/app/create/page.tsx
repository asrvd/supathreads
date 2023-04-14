import ThreadForm from "@/components/thread-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SignIn } from "../actions";

export default async function Create() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <ThreadForm />
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
