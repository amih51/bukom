"use client";

import { useSession } from "next-auth/react";
import { SubmitPost } from "@/app/api/post/submit-post";

import "../post/editor/styles.css";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import MathExtension from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  LuBold,
  LuStrikethrough,
  LuItalic,
  LuList,
  LuListOrdered,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuQuote,
  LuUndo,
  LuRedo,
  LuCode,
  LuUnderline,
  LuHighlighter,
  LuSubscript,
  LuSuperscript,
} from "react-icons/lu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaKeyboard } from "react-icons/fa";

export function CreatePostDialog() {
  const { data: session } = useSession();
  const user = session?.user;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Hey, what's happening?" }),
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

  if (!editor) return null;

  async function onSubmit() {
    await SubmitPost(editor?.getHTML() || "");
    editor?.commands.clearContent();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"revert"}
          className="flex h-fit w-fit items-center justify-start border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
        >
          <FaKeyboard className="size-6 flex-shrink-0" />
          <p className="ml-2 hidden truncate lg:inline">Create Post</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] p-0 lg:max-w-4xl">
        <div className="my-12 overflow-auto border-y-2">
          <div className="sm:mx-12 sm:border-x-2">
            <div className="flex w-full flex-row">
              <div className="flex items-center border-r-2 p-2">
                <Avatar className="size-12 lg:size-20">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex w-full flex-col overflow-auto">
                <div className="flex h-12 flex-row overflow-auto scrollbar scrollbar-none">
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().undo().run();
                    }}
                    variant={editor.isActive("undo") ? "revert" : "ghost"}
                  >
                    <LuUndo className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().redo().run();
                    }}
                    variant={editor.isActive("redo") ? "revert" : "ghost"}
                  >
                    <LuRedo className="size-3" />
                  </Button>
                  <Button
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    variant={editor.isActive("codeBlock") ? "revert" : "ghost"}
                    className="h-full border-r-2"
                  >
                    <LuCode className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleBold().run();
                    }}
                    variant={editor.isActive("bold") ? "revert" : "ghost"}
                  >
                    <LuBold className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleItalic().run();
                    }}
                    variant={editor.isActive("italic") ? "revert" : "ghost"}
                  >
                    <LuItalic className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleStrike().run();
                    }}
                    variant={editor.isActive("strike") ? "revert" : "ghost"}
                  >
                    <LuStrikethrough className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleUnderline().run();
                    }}
                    variant={editor.isActive("underline") ? "revert" : "ghost"}
                  >
                    <LuUnderline className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleSubscript().run();
                    }}
                    variant={editor.isActive("subscript") ? "revert" : "ghost"}
                  >
                    <LuSubscript className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleSuperscript().run();
                    }}
                    variant={
                      editor.isActive("superscript") ? "revert" : "ghost"
                    }
                  >
                    <LuSuperscript className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHighlight().run();
                    }}
                    variant={editor.isActive("highlight") ? "revert" : "ghost"}
                  >
                    <LuHighlighter className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 1 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading1 className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 2 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading2 className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 3 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading3 className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleBulletList().run();
                    }}
                    variant={editor.isActive("bulletList") ? "revert" : "ghost"}
                  >
                    <LuList className="size-3" />
                  </Button>
                  <Button
                    className="h-full border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleOrderedList().run();
                    }}
                    variant={
                      editor.isActive("orderedList") ? "revert" : "ghost"
                    }
                  >
                    <LuListOrdered className="size-3" />
                  </Button>
                  <Button
                    className="h-full"
                    onClick={() => {
                      editor.chain().focus().toggleBlockquote().run();
                    }}
                    variant={editor.isActive("blockquote") ? "revert" : "ghost"}
                  >
                    <LuQuote className="size-3" />
                  </Button>
                </div>
                <EditorContent
                  editor={editor}
                  className="max-h-[75vh] min-h-52 overflow-auto border-y-2 p-2 scrollbar scrollbar-thumb-current scrollbar-w-1 hover:scrollbar-thumb-foreground/50"
                />
                <div className="flex flex-row">
                  <DialogClose className="w-full">
                    <Button
                      onClick={onSubmit}
                      disabled={!editor.getText().trim()}
                      variant={"ghost"}
                      className="w-full"
                    >
                      Submit
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
