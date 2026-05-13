"use client";

import { useState } from "react";

interface VoteButtonsProps {
  questionId: string;
}

export default function VoteButtons({
  questionId,
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(0);

  const handleVote = async (
    voteStatus: "upvoted" | "downvoted"
  ) => {
    try {
      await fetch("/api/votes", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          type: "question",
          typeId: questionId,
          voteStatus,
          votedById: "user",
        }),
      });

      if (voteStatus === "upvoted") {
        setVotes((prev) => prev + 1);
      } else {
        setVotes((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      
      <button
        onClick={() =>
          handleVote("upvoted")
        }
        className="rounded-xl bg-green-500 px-4 py-2 font-bold text-white"
      >
        ↑ Upvote
      </button>

      <p className="text-xl font-bold">
        {votes}
      </p>

      <button
        onClick={() =>
          handleVote("downvoted")
        }
        className="rounded-xl bg-red-500 px-4 py-2 font-bold text-white"
      >
        ↓ Downvote
      </button>
    </div>
  );
}