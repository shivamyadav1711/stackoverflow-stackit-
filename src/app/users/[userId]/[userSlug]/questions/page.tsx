import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { answerCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import Link from "next/link";
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
  }>;
}) => {
  const { userId } = await params;
  const sp = await searchParams;

  const page = Number(sp.page || "1");

  const queries = [
    Query.equal("authorId", userId),
    Query.orderDesc("$createdAt"),
    Query.offset((page - 1) * 25),
    Query.limit(25),
  ];

  const questions = await databases.listDocuments(
    db,
    questionCollection,
    queries
  );

  return (
    <div className="px-4">
      
      <div className="mb-4">
        <p>{questions.total} questions</p>
      </div>

      <div className="mb-4 max-w-3xl space-y-6">
        {questions.documents.map((q: any) => (
          <div key={q.$id}>
            
            <div className="max-h-40 overflow-auto">
              <MarkdownPreview
                source={q.content}
                className="rounded-lg p-4"
              />
            </div>

            <Link
              href={`/questions/${q.$id}/${slugify(q.title)}`}
              className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
            >
              View Question
            </Link>

          </div>
        ))}
      </div>

      <Pagination total={questions.total} limit={25} />
    </div>
  );
};

export default Page;