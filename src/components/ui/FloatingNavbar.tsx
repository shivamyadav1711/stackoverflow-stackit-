"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useAuthStore } from "@/store/Auth";

export default function FloatingNavbar() {
  const {
    user,
    fetchUser,
    logout,
  } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="text-3xl font-bold text-cyan-400"
        >
          StackIt
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-6 text-white">

          {/* HOME */}
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
          >
            Home
          </Link>

          {/* QUESTIONS */}
          <Link
            href="/questions"
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
          >
            Questions
          </Link>

          {/* ASK QUESTION */}
          <Link
            href={user ? "/questions/ask" : "/login"}
            className="rounded-xl bg-cyan-400 px-5 py-2 font-bold text-black transition hover:scale-105"
          >
            Ask Question
          </Link>

          {user ? (
            <>
              {/* PROFILE */}
              <Link
                href={`/users/${user.$id}/${encodeURIComponent(user.name)}`}
                className="hover:text-cyan-400"
              >
                Profile
              </Link>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="rounded-xl bg-red-500 px-5 py-2 font-bold text-white transition hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                href="/login"
                className="rounded-xl border border-cyan-400 px-5 py-2 text-cyan-400"
              >
                Login
              </Link>

              {/* SIGNUP */}
              <Link
                href="/register"
                className="rounded-xl bg-cyan-400 px-5 py-2 font-bold text-black"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}