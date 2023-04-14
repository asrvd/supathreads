import { SignIn } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NavButton } from "@/components/ui/buttons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full flex flex-col h-[90vh] justify-center items-center">
      <h2 className="font-black bg-gradient-to-b from-teal-400 via-sky-200 to-indigo-400 lg:w-[56%] md:w-2/3 text-center text-[3rem] lg:text-[5rem] text-transparent bg-clip-text leading-none tracking-tight mb-6">
        turn your blogs into concise twitter threads
      </h2>
      {session?.user ? (
        <NavButton label="Start Creating" route="/create" />
      ) : (
        <SignIn label="Get Started" />
      )}
    </section>
  );
}
