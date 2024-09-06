"use client";

import "./styles.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Button } from "@/components/ui/button";
import MathExtension from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";
import { SubmitReply } from "@/app/api/post/submit-reply";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

export default function ReplyEditor({ parentId }: { parentId: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Reply..." }),
      Underline,
      Subscript,
      Superscript,
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

  async function onSubmit() {
    await SubmitReply(editor?.getHTML() || "", parentId);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex w-full">
      <EditorContent
        editor={editor}
        className="w-full border-b-2 border-l-2 border-r-2 p-2"
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
