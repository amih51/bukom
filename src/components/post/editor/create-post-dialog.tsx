"use client";

import { useSession } from "next-auth/react";
import { SubmitPost } from "@/app/api/post/submit/submit-post";

import "./styles.css";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
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
  LuAlignLeft,
  LuAlignCenter,
  LuAlignJustify,
} from "react-icons/lu";
import { FaKeyboard } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
    try {
      await SubmitPost(editor?.getHTML() || "");
      editor?.commands.clearContent();
      toast.success("Post submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit post.");
    }
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
      <DialogContent className="w-[94%] p-0 lg:max-w-4xl">
        <div className="my-12 overflow-auto border-y-2">
          <div className="sm:mx-12 sm:border-x-2">
            <div className="flex w-full flex-row">
              <div className="hidden items-center border-r-2 p-2 sm:flex">
                <Avatar className="size-12 lg:size-20">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex w-full flex-col overflow-auto">
                <div className="flex h-9 flex-row overflow-auto scrollbar scrollbar-none">
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().undo().run();
                    }}
                    variant={editor.isActive("undo") ? "revert" : "ghost"}
                  >
                    <LuUndo className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().redo().run();
                    }}
                    variant={editor.isActive("redo") ? "revert" : "ghost"}
                  >
                    <LuRedo className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    variant={editor.isActive("codeBlock") ? "revert" : "ghost"}
                    className="h-full w-9 border-r-2"
                  >
                    <LuCode className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleBold().run();
                    }}
                    variant={editor.isActive("bold") ? "revert" : "ghost"}
                  >
                    <LuBold className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleItalic().run();
                    }}
                    variant={editor.isActive("italic") ? "revert" : "ghost"}
                  >
                    <LuItalic className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleStrike().run();
                    }}
                    variant={editor.isActive("strike") ? "revert" : "ghost"}
                  >
                    <LuStrikethrough className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleUnderline().run();
                    }}
                    variant={editor.isActive("underline") ? "revert" : "ghost"}
                  >
                    <LuUnderline className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleSubscript().run();
                    }}
                    variant={editor.isActive("subscript") ? "revert" : "ghost"}
                  >
                    <LuSubscript className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleSuperscript().run();
                    }}
                    variant={
                      editor.isActive("superscript") ? "revert" : "ghost"
                    }
                  >
                    <LuSuperscript className="size-5 flex-shrink-0" />
                  </Button>
                  <div className="relative flex h-full w-9 items-center justify-center border-r-2 hover:bg-accent hover:text-accent-foreground">
                    <input
                      type="color"
                      className="absolute size-9 cursor-pointer opacity-0"
                      onInput={(event) =>
                        editor
                          .chain()
                          .focus()
                          .setColor((event.target as HTMLInputElement).value)
                          .run()
                      }
                      value={editor.getAttributes("textStyle").color}
                      data-testid="setColor"
                    />
                    <MdOutlineBorderColor className="m-auto mx-2 size-5 flex-shrink-0" />
                  </div>
                  <div className="relative flex h-full w-9 items-center justify-center border-r-2 hover:bg-accent hover:text-accent-foreground">
                    <input
                      type="color"
                      className="absolute size-9 cursor-pointer opacity-0"
                      onInput={(event) =>
                        editor
                          .chain()
                          .focus()
                          .toggleHighlight({
                            color: (event.target as HTMLInputElement).value,
                          })
                          .run()
                      }
                      value={editor.getAttributes("textStyle").color}
                      data-testid="setColor"
                    />
                    <LuHighlighter className="m-auto mx-2 size-5 flex-shrink-0" />
                  </div>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().setTextAlign("left").run();
                    }}
                    variant={
                      editor.isActive({ textAlign: "left" })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuAlignLeft className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().setTextAlign("center").run();
                    }}
                    variant={
                      editor.isActive({ textAlign: "center" })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuAlignCenter className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().setTextAlign("right").run();
                    }}
                    variant={
                      editor.isActive({ textAlign: "right" })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuAlignLeft className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().setTextAlign("justify").run();
                    }}
                    variant={
                      editor.isActive({ textAlign: "justify" })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuAlignJustify className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 1 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading1 className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 2 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading2 className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    variant={
                      editor.isActive("heading", { level: 3 })
                        ? "revert"
                        : "ghost"
                    }
                  >
                    <LuHeading3 className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleBulletList().run();
                    }}
                    variant={editor.isActive("bulletList") ? "revert" : "ghost"}
                  >
                    <LuList className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9 border-r-2"
                    onClick={() => {
                      editor.chain().focus().toggleOrderedList().run();
                    }}
                    variant={
                      editor.isActive("orderedList") ? "revert" : "ghost"
                    }
                  >
                    <LuListOrdered className="size-5 flex-shrink-0" />
                  </Button>
                  <Button
                    className="h-full w-9"
                    onClick={() => {
                      editor.chain().focus().toggleBlockquote().run();
                    }}
                    variant={editor.isActive("blockquote") ? "revert" : "ghost"}
                  >
                    <LuQuote className="size-5 flex-shrink-0" />
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