"use client";

import RTE from "@/components/RTE";
import Meteors from "@/components/magicui/meteors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { IconX } from "@tabler/icons-react";
import { ID, Models } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/name";
import { Confetti } from "@/components/magicui/confetti";

type Question = Models.Document & {
  title?: string;
  content?: string;
  tags?: string[];
  attachmentId?: string;
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
        className
      )}
    >
      <Meteors number={30} />
      {children}
    </div>
  );
};

const QuestionForm = ({ question }: { question?: Question }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tag, setTag] = React.useState("");

  const [formData, setFormData] = React.useState({
    title: question?.title ?? "",
    content: question?.content ?? "",
    authorId: user?.$id,
    tags: new Set<string>(question?.tags ?? []),
    attachment: null as File | null,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadConfetti = (timeInMS = 3000) => {
    const end = Date.now() + timeInMS;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      Confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      Confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const create = async () => {
    if (!formData.attachment) throw new Error("Please upload an image");

    const storageResponse = await storage.createFile(
      questionAttachmentBucket,
      ID.unique(),
      formData.attachment
    );

    const response = await databases.createDocument(
      db,
      questionCollection,
      ID.unique(),
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: storageResponse.$id,
      }
    );

    loadConfetti();
    return response;
  };

  const update = async () => {
    if (!question) throw new Error("No question found");

    const attachmentId = formData.attachment
      ? (
          await storage.createFile(
            questionAttachmentBucket,
            ID.unique(),
            formData.attachment
          )
        ).$id
      : question.attachmentId;

    const response = await databases.updateDocument(
      db,
      questionCollection,
      question.$id,
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId,
      }
    );

    return response;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.authorId) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = question ? await update() : await create();
      router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {error && (
        <LabelInputContainer>
          <div className="text-center text-red-500">{error}</div>
        </LabelInputContainer>
      )}

      {/* Title */}
      <LabelInputContainer>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
        />
      </LabelInputContainer>

      {/* Content */}
      <LabelInputContainer>
        <Label>Content</Label>
        <RTE
          value={formData.content}
          onChange={(v) =>
            setFormData((p) => ({ ...p, content: v || "" }))
          }
        />
      </LabelInputContainer>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="rounded bg-orange-500 px-4 py-2 text-white"
      >
        {question ? "Update" : "Publish"}
      </button>
    </form>
  );
};

export default QuestionForm;