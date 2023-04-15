/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navItems = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create",
    route: "/create",
  },
  {
    label: "Dashboard",
    route: "/dashboard",
  },
];

export default function NavMenu({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !imageRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="w-full relative flex justify-end">
      <img
        src={session.user?.image as string}
        ref={imageRef}
        alt="user"
        className="rounded-full self-end h-8 w-8 cursor-pointer hover:border border-zinc-500/50 duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute top-10 right-0 w-full h-auto flex flex-col bg-zinc-200 border-zinc-300/60 shadow-2xl rounded-md p-1 divide-y divide-zinc-400/50 z-[1000]">
          <div className="w-full px-2 py-1 text-sm">
            <h2 className="m-0 leading-none text-zinc-950 font-semibold">
              {session.user?.name}
            </h2>
            <p className="m-0 text-zinc-800">{session.user?.email}</p>
          </div>
          <div className="w-full flex flex-col py-1 text-sm" ref={ref}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.route}
                className="text-zinc-900 rounded-md hover:bg-zinc-300/80 px-2 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="w-full pt-1 text-sm">
            <button
              className="text-zinc-900 w-full rounded-md hover:bg-zinc-300/80 px-2 py-2 text-left"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
