"use client";

import { PostData } from "@/lib/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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

export default function DisplayPost({ post }: { post: PostData }) {
  const editor = useEditor({
    extensions: [StarterKit, MathExtension],
    content: post.content,
    editable: false,
    immediatelyRender: false,
  });

  const user = post.user;

  return (
    <div className="my-2 flex flex-col border-l-2 border-t-2 sm:border-l-0">
      <div className="flex flex-row border-b-2 border-r-2">
        <div className="flex w-full flex-row">
          <Link
            href={`/${user.username}`}
            className="flex items-center border-r-2 p-2"
          >
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex w-full flex-col pl-2">
            <Link
              href={`/${user.username}`}
              className="flex w-fit flex-row items-center"
            >
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate pl-2 text-sm opacity-50">
                @{user?.username}
              </p>
            </Link>
            {post.parentId && (
              <div className="flex flex-row">
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
      <Link
        href={`/${user.username}/post/${post.id}`}
        className="min-h-16 border-b-2 border-r-2 p-2"
      >
        <EditorContent editor={editor}></EditorContent>
      </Link>
      <div className="flex flex-row">
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 border-r p-1"
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
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 border-r-2 p-1"
        >
          <PiSmiley className="size-5" />
        </Button>
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-b-2 p-1"
        >
          <PiChat className="size-5" />
        </Button>
        <div className="h-full w-full border-l-2">
          <ReplyEditor parentId={post.id} />
        </div>
      </div>
    </div>
  );
}
