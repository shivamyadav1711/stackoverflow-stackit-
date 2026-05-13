import { users } from "@/models/server/config";
import React from "react";
import Link from "next/link";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
    userSlug: string;
  };
}) => {
  const user = await users.get(params.userId);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* TOP NAVBAR */}
      <div className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          <Link
            href="/"
            className="text-3xl font-bold text-cyan-400"
          >
            StackIt
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/questions"
              className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
            >
              Questions
            </Link>

            <Link
              href="/questions/ask"
              className="rounded-xl bg-cyan-400 px-5 py-2 font-bold text-black"
            >
              Ask Question
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20 pt-32">
        
        {/* PROFILE CARD */}
        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
          
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            
            {/* AVATAR */}
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-cyan-400 text-6xl font-bold text-black">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4">
              
              <div>
                <h1 className="text-5xl font-bold text-cyan-400">
                  {user.name}
                </h1>

                <p className="mt-2 text-lg text-gray-400">
                  {user.email}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-gray-400">
                    Joined
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    {new Date(
                      user.$createdAt
                    ).toLocaleDateString()}
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-gray-400">
                    Last Seen
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Online
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-gray-400">
                    Status
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-cyan-400">
                    Developer
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-8 flex flex-wrap gap-4">
          
          <Link
            href={`/users/${params.userId}/${params.userSlug}`}
            className="rounded-xl bg-cyan-400 px-5 py-2 font-bold text-black"
          >
            Profile
          </Link>

          <Link
            href={`/users/${params.userId}/${params.userSlug}/answers`}
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
          >
            Answers
          </Link>

          <Link
            href={`/users/${params.userId}/${params.userSlug}/votes`}
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
          >
            Votes
          </Link>

          
        </div>

        {/* PAGE CONTENT */}
        <div className="mt-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;