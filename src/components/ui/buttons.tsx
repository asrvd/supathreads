"use client";

import { useRouter } from "next/navigation";
import { CopyIcon } from "../icons/Copy";
import { CheckIcon } from "../icons/Check";
import { useState } from "react";

export function NavButton({ label, route }: { label: string; route: string }) {
  const router = useRouter();

  return (
    <button
      className="flex justify-center items-center bg-zinc-900/50 text-zinc-100 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-900 transition-all border hover:border-sky-300/60 duration-200 border-indigo-300/60"
      onClick={() => router.push(route)}
    >
      {label}
    </button>
  );
}

export function UtilButton({
  label,
  onClick,
}: {
  label: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-900/50 text-zinc-100 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-900 transition-all border hover:border-sky-300/60 duration-200 border-indigo-300/60"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <button
      className="flex justify-center items-center bg-zinc-900/50 text-zinc-100 p-2 rounded-md text-center font-semibold text-xs hover:bg-zinc-900 transition-all border hover:border-sky-300/60 duration-200 border-indigo-300/60 absolute top-2 right-2"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        await sleep(1500);
        setCopied(false);
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
