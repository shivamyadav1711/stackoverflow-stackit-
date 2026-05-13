"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AskQuestionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    alert("Question Posted Successfully");

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <div className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          <h1 className="text-3xl font-bold text-cyan-400">
            StackIt
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
            >
              Home
            </button>

            <button
              onClick={() =>
                router.push("/questions")
              }
              className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
            >
              Questions
            </button>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="mx-auto max-w-3xl px-4 py-32">
        
        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
          
          <h1 className="mb-10 text-5xl font-bold text-cyan-400">
            Ask Question
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Question title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#111] p-4 text-white outline-none"
              required
            />

            <textarea
              placeholder="Explain your problem..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              className="h-60 w-full rounded-xl border border-white/10 bg-[#111] p-4 text-white outline-none"
              required
            />

            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-8 py-4 text-lg font-bold text-black"
            >
              Post Question
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}