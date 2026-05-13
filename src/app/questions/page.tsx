import { databases, users } from "@/models/server/config";

import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";

import { Query } from "node-appwrite";

import Link from "next/link";

import QuestionCard from "@/components/QuestionCard";

import Pagination from "@/components/Pagination";

import Search from "./Search";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    search?: string;
  }>;
}) => {
  const params = await searchParams;

  const page = params.page || "1";

  const queries = [
    Query.orderDesc("$createdAt"),
    Query.offset((+page - 1) * 25),
    Query.limit(25),
  ];

  const questions =
    await databases.listDocuments(
      db,
      questionCollection,
      queries
    );

  questions.documents =
    await Promise.all(
      questions.documents.map(
        async (ques: any) => {
          const [
            author,
            answers,
            votes,
          ] = await Promise.all([
            users.get(
              ques.authorId
            ),

            databases.listDocuments(
              db,
              answerCollection,
              [
                Query.equal(
                  "questionId",
                  ques.$id
                ),
              ]
            ),

            databases.listDocuments(
              db,
              voteCollection,
              [
                Query.equal(
                  "type",
                  "question"
                ),

                Query.equal(
                  "typeId",
                  ques.$id
                ),
              ]
            ),
          ]);

          return {
            ...ques,

            totalAnswers:
              answers.total,

            totalVotes:
              votes.total,

            author: {
              $id: author.$id,
              name:
                author.name,
            },
          };
        }
      )
    );

  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="container mx-auto px-4 pb-20 pt-36">
        
        {/* TOP BAR */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h1 className="text-5xl font-extrabold text-cyan-400">
              Explore Questions
            </h1>

            <p className="mt-3 text-gray-400">
              Discover developer discussions and coding solutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-[#111] px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/questions/ask"
              className="rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
            >
              Ask Question
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-[#111] p-6">
          <Search />
        </div>

        {/* TOTAL */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            {questions.total} Questions
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {questions.documents.map(
            (ques: any) => (
              <QuestionCard
                key={ques.$id}
                ques={ques}
              />
            )
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-10">
          <Pagination
            total={questions.total}
            limit={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;