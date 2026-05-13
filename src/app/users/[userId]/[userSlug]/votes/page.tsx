import Pagination from "@/components/Pagination";
import { db, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { Query } from "node-appwrite";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    userId: string;
    userSlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    voteStatus?: "upvoted" | "downvoted";
  }>;
}) => {
  const { userId } = await params;
  const sp = await searchParams;

  const page = Number(sp.page || "1");

  const queries = [
    Query.equal("userId", userId),
    Query.orderDesc("$createdAt"),
    Query.offset((page - 1) * 25),
    Query.limit(25),
  ];

  if (sp.voteStatus) {
    queries.push(Query.equal("voteStatus", sp.voteStatus));
  }

  const votes = await databases.listDocuments(
    db,
    voteCollection,
    queries
  );

  return (
    <div className="px-4">
      
      <div className="mb-4">
        <p>{votes.total} votes</p>
      </div>

      <div className="space-y-4">
        {votes.documents.map((vote: any) => (
          <div
            key={vote.$id}
            className="rounded border border-white/10 bg-[#111] p-4 text-white"
          >
            <p>Vote Status: {vote.voteStatus}</p>
            <p>Question ID: {vote.questionId}</p>
          </div>
        ))}
      </div>

      <Pagination total={votes.total} limit={25} />
    </div>
  );
};

export default Page;