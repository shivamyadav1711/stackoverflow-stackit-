import { databases, users } from "@/models/server/config";

import {
  MagicCard,
  MagicContainer,
} from "@/components/magicui/magic-card";

import NumberTicker from "@/components/magicui/number-ticker";

import {
  answerCollection,
  db,
  questionCollection,
} from "@/models/name";

import { Query } from "node-appwrite";

const Page = async ({
  params,
}: {
  params: Promise<{
    userId: string;
    userSlug: string;
  }>;
}) => {
  const { userId } = await params;

  const [user, questions, answers] = await Promise.all([
    users.get(userId),

    databases.listDocuments(db, questionCollection, [
      Query.equal("authorId", userId),
      Query.limit(1),
    ]),

    databases.listDocuments(db, answerCollection, [
      Query.equal("authorId", userId),
      Query.limit(1),
    ]),
  ]);

  return (
    <div className="mt-10">
      <MagicContainer className="grid gap-6 md:grid-cols-3">

        <MagicCard className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-10 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-400">
            Reputation
          </h2>
          <div className="mt-6 text-6xl font-extrabold text-cyan-400">
            <NumberTicker value={user.prefs?.reputation || 0} />
          </div>
        </MagicCard>

        <MagicCard className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-10 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-400">
            Questions
          </h2>
          <div className="mt-6 text-6xl font-extrabold text-cyan-400">
            <NumberTicker value={questions.total} />
          </div>
        </MagicCard>

        <MagicCard className="rounded-3xl border border-cyan-500/20 bg-zinc-950 p-10 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-400">
            Answers
          </h2>
          <div className="mt-6 text-6xl font-extrabold text-cyan-400">
            <NumberTicker value={answers.total} />
          </div>
        </MagicCard>

      </MagicContainer>
    </div>
  );
};

export default Page;