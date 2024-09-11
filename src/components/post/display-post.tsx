"use client";

import "./editor/styles.css";

import { PostData } from "@/lib/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "../ui/button";
import {
  PiArrowFatDown,
  PiArrowFatUp,
  PiBookmarkSimple,
  PiChat,
  PiDotsThreeVerticalBold,
  PiSmiley,
} from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MathExtension from "@aarkue/tiptap-math-extension";
import Link from "next/link";
import ReplyEditor from "./editor/reply-editor";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
const lowlight = createLowlight(all);

export default function DisplayPost({ post }: { post: PostData }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: post.content,
    editable: false,
    immediatelyRender: false,
  });

  const user = post.user;

  return (
    <div className="flex flex-col sm:border-l-0">
      <div className="flex flex-row border-x-2 border-y-2 sm:border-l-0">
        <div className="flex w-full flex-row overflow-hidden">
          <Link
            href={`/${user.username}`}
            className="flex items-center border-r-2 p-2"
          >
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex w-full flex-col overflow-hidden pl-2">
            <Link
              href={`/${user.username}`}
              className="flex w-fit flex-row items-center overflow-hidden"
            >
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate pl-2 text-sm opacity-50">
                @{user?.username}
              </p>
            </Link>
            {post.parentId && (
              <div className="flex flex-row overflow-hidden">
                <span className="mr-2 opacity-50">replying to</span>
                <Link
                  href={`/${post.parent?.user.username}/post/${post.parent?.id}`}
                >
                  @{post.parent?.user.username}
                </Link>
              </div>
            )}
            <p className="truncate text-xs opacity-50">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <Button
            variant={"ghost"}
            className="h-full flex-shrink-0 border-l-2 p-1"
          >
            <PiBookmarkSimple className="size-8" />
          </Button>
          <Button
            variant={"ghost"}
            className="h-full flex-shrink-0 border-l-2 p-1"
          >
            <PiDotsThreeVerticalBold className="size-8" />
          </Button>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-16 border-x-2 border-b-2 p-2 sm:border-l-0"
      ></EditorContent>
      <div className="flex flex-row overflow-hidden">
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 border-l-2 border-r p-1 sm:border-l-0"
        >
          <PiArrowFatUp className="size-5" />
        </Button>
        <p className="flex size-9 items-center justify-center border-b-2 border-r text-xl">
          0
        </p>
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 border-r-2 p-1"
        >
          <PiArrowFatDown className="size-5" />
        </Button>
        {/* <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 border-r-2 p-1"
        >
          <PiSmiley className="size-5" />
        </Button> */}
        <Button
          variant={"ghost"}
          className="h-9 w-fit flex-shrink-0 border-b-2 p-2"
        >
          <Link
            href={`/${post.user.username}/post/${post.id}`}
            className="flex flex-row items-center justify-center"
          >
            <PiChat className="mr-1 size-5 flex-shrink-0" />
            <p className="text-xl">{post._count.replies}</p>
          </Link>
        </Button>
        <div className="h-full w-full">
          <ReplyEditor parentId={post.id} />
        </div>
      </div>
    </div>
  );
}
