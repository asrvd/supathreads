"use client";

import { signIn, signOut } from "next-auth/react";
import { GitHubIcon } from "@/components/icons/GitHub";

export function SignOut() {
  return (
    <button
      className="flex justify-center items-center bg-zinc-900/50 text-zinc-100 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-900 transition-all border hover:border-sky-300/60 duration-200 border-indigo-300/60"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-900/50 text-zinc-100 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-900 transition-all border hover:border-sky-300/60 duration-200 border-indigo-300/60"
      onClick={() => signIn("github")}
    >
      <GitHubIcon />
      <div className="ml-3">{label}</div>
    </button>
  );
}
