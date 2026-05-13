import { db, questionCollection, answerCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { Query } from "node-appwrite";
import AnswerForm from "@/app/components/AnswerForm";

const Page = async ({
  params,
}: {
  params: Promise<{
    quesId: string;
    quesName: string;
  }>;
}) => {
  const { quesId } = await params;

  const question = await databases.getDocument(
    db,
    questionCollection,
    quesId
  );

  const answers = await databases.listDocuments(
    db,
    answerCollection,
    [
      Query.equal("questionId", quesId),
      Query.orderDesc("$createdAt"),
    ]
  );

  return (
    <div className="container mx-auto px-4 pb-20 pt-32 text-white">
      
      {/* QUESTION */}
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          {question.title}
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          {question.content}
        </p>
      </div>

      {/* ANSWERS */}
      <div className="mt-10">
        <h2 className="mb-6 text-3xl font-bold">Answers</h2>

        <div className="space-y-6">
          {answers.documents.map((answer: any) => (
            <div
              key={answer.$id}
              className="rounded-2xl border border-white/10 bg-[#111] p-6"
            >
              <p className="text-gray-300">
                {answer.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ANSWER FORM */}
      <AnswerForm questionId={quesId} />
    </div>
  );
};

export default Page;