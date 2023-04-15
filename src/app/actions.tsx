"use client";

import { signIn, signOut } from "next-auth/react";
import { GitHubIcon } from "@/components/icons/GitHub";

export function SignOut() {
  return (
    <button
      className="flex justify-center items-center bg-zinc-200 text-zinc-950 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-200 text-zinc-950 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
      onClick={() => signIn("github")}
    >
      <GitHubIcon />
      <div className="ml-3">{label}</div>
    </button>
  );
}
