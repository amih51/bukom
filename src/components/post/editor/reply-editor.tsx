"use client";

import "./styles.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import MathExtension from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

import { Button } from "@/components/ui/button";
import { useSubmitReplyMutation } from "./mutations-reply";
import { BsIncognito } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingButton from "@/components/loading-button";

export default function ReplyEditor({
  parentId,
  categoryId,
}: {
  parentId: string;
  categoryId: string;
}) {
  const { data: session } = useSession();
  const user = session?.user;

  const [isAnon, setIsAnon] = useState(false);

  const mutation = useSubmitReplyMutation();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Reply..." }),
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      MathExtension.configure({
        evaluation: false,
        katexOptions: { macros: { "\\B": "\\mathbb{B}" } },
        delimiters: "dollar",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    immediatelyRender: false,
  });

  function onSubmit() {
    mutation.mutate(
      { input: editor?.getHTML() || "", parentId, categoryId, isAnon },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
        },
      },
    );
  }

  return (
    <div className="flex w-full items-center">
      <Avatar className="size-8">
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>{user?.username}</AvatarFallback>
      </Avatar>
      <EditorContent
        editor={editor}
        className="mx-2 w-full rounded-2xl bg-secondary p-2"
      />
      <div className="flex h-fit flex-row">
        <Button
          onClick={() => setIsAnon((prev) => !prev)}
          variant={isAnon ? "revert" : "outline"}
          className="rounded-r-none"
        >
          <BsIncognito className="size-5" />
        </Button>
        <LoadingButton
          loading={mutation.isPending}
          onClick={onSubmit}
          disabled={!editor?.getText().trim() || categoryId === ""}
          variant={"outline"}
          className="w-full rounded-l-none"
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
}
