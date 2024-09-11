"use client";

import { useSession } from "next-auth/react";
import { SubmitPost } from "@/components/post/editor/submit-post";

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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MathExtension from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);
import { PiCodeSimple } from "react-icons/pi";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/loading-button";

export default function PostEditor() {
  const { data: session } = useSession();
  const user = session?.user;
  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Hey, what's happening?" }),
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
    mutation.mutate(editor?.getHTML() || "", {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
    // try {
    //   await SubmitPost(editor?.getHTML() || "");
    //   editor?.commands.clearContent();
    //   toast.success("Post submitted successfully!");
    // } catch (error) {
    //   toast.error("Failed to submit post.");
    // }
  }

  return (
    <div className="flex w-full flex-row">
      <div className="flex items-center border-r-2 p-2">
        <Avatar className="size-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full flex-col">
        <EditorContent
          editor={editor}
          className="min-h-16 overflow-auto border-b-2 p-2 scrollbar scrollbar-thumb-current scrollbar-w-1 hover:scrollbar-thumb-foreground/50"
        />
        <div className="flex w-full flex-row">
          <Button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            variant={"ghost"}
            className="border-r-2"
          >
            <PiCodeSimple />
          </Button>
          <LoadingButton
            loading={mutation.isPending}
            onClick={onSubmit}
            disabled={!editor?.getText().trim()}
            variant={"ghost"}
            className="w-full"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
