/* eslint-disable @next/next/no-img-element */

import { SignIn } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NavButton } from "@/components/ui/buttons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full lg:w-[90%] flex flex-col lg:flex-row h-[90vh] justify-center items-center p-4 my-6">
      <div className="flex flex-col lg:items-start items-center justify-center lg:px-4">
        <h2 className="font-black bg-gradient-to-b from-zinc-800 via-neutral-600 to-stone-800 text-[3rem] md:text-[4.5rem] lg:text-[5rem] text-transparent bg-clip-text leading-none tracking-tight mb-8 lg:text-left text-center">
          turn your blogs into concise twitter threads
        </h2>
        {session?.user ? (
          <NavButton label="Start Creating" route="/create" />
        ) : (
          <SignIn label="Get Started" />
        )}
      </div>
      <img
        src="https://illustrations.popsy.co/white/taking-notes.svg"
        alt="illustration"
        className="w-[500px] h-[460px] lg:px-4 select-none"
      />
    </section>
  );
}
