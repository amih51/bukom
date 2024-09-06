"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import "./styles.css";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MathExtension from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";
import { SubmitReply } from "@/app/api/post/submit-reply";

export default function ReplyEditor({ parentId }: { parentId: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Reply..." }),
      MathExtension.configure({
        evaluation: false,
        katexOptions: { macros: { "\\B": "\\mathbb{B}" } },
        delimiters: "dollar",
      }),
    ],
    immediatelyRender: false,
  });

  async function onSubmit() {
    await SubmitReply(editor?.getHTML() || "", parentId);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex size-full">
      <EditorContent
        editor={editor}
        className="w-full border-b-2 border-r-2 p-2"
      />
      <div className="h-fit border-b-2 border-r-2">
        <Button
          onClick={onSubmit}
          disabled={!editor?.getText().trim()}
          variant={"ghost"}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
