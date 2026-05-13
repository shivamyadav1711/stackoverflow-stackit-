"use client";

import Link from "next/link";
import VoteButtons from "./VoteButtons";

interface Props {
  ques: any;
}

export default function QuestionCard({
  ques,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6 text-white shadow-xl transition duration-300 hover:border-cyan-400/40">
      
      {/* TITLE */}
      <Link
        href={`/questions/${ques.$id}`}
      >
        <h2 className="text-2xl font-bold text-cyan-400 hover:underline">
          {ques.title}
        </h2>
      </Link>

      {/* CONTENT */}
      <p className="mt-4 line-clamp-3 text-gray-300">
        {ques.content}
      </p>

      {/* TAGS */}
      {ques.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {ques.tags.map(
            (tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
              >
                #{tag}
              </span>
            )
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        
        <div className="flex gap-4 text-sm text-gray-400">
          <p>
            {ques.totalAnswers || 0} Answers
          </p>

          <p>
            {ques.totalVotes || 0} Votes
          </p>
        </div>

        <div className="text-sm text-gray-400">
          {ques.author?.name || "Anonymous"}
        </div>
      </div>

      {/* VOTING */}
      <div className="mt-6">
        <VoteButtons
          questionId={ques.$id}
        />
      </div>
    </div>
  );
}