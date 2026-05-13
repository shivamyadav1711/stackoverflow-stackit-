"use client";

import { useState } from "react";

interface Props {
  questionId: string;
}

export default function AnswerForm({
  questionId,
}: Props) {
  const [answer, setAnswer] =
    useState("");

  const handleAnswer = async (
    e: any
  ) => {
    e.preventDefault();

    try {
      await fetch("/api/answers", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          questionId,
          answer,
          authorId: "user",
        }),
      });

      alert("Answer Added");

      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleAnswer}
      className="mt-10 space-y-4"
    >
      <textarea
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        className="h-40 w-full rounded-2xl border border-white/10 bg-[#111] p-4 text-white outline-none"
      />

      <button
        type="submit"
        className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-black"
      >
        Submit Answer
      </button>
    </form>
  );
}