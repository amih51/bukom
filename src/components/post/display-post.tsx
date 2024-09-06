"use client";

import { PostData } from "@/lib/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { PiArrowFatDown, PiArrowFatUp, PiSmiley } from "react-icons/pi";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function DisplayPost({ post }: { post: PostData }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
    editable: false,
    immediatelyRender: false,
  });

  const user = post.user;

  return (
    <div className="my-2 flex flex-col border-2 sm:border-l-0">
      <div className="flex flex-row border-b-2">
        <div className="flex items-center border-r-2 p-2">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex w-full flex-col pl-2">
          <div className="flex flex-row items-center">
            <p className="truncate text-lg">{user?.name}</p>
            <p className="truncate pl-2 text-sm opacity-50">
              @{user?.username}
            </p>
          </div>
          <p className="truncate text-xs opacity-50">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="min-h-16 border-b-2 p-2">
        <EditorContent editor={editor}></EditorContent>
      </div>
      <div className="flex flex-row items-center">
        <Button variant={"ghost"} className="size-9 flex-shrink-0 border-r p-1">
          <PiArrowFatUp className="size-8" />
        </Button>
        <p className="flex size-9 items-center justify-center border-r text-xl">
          0
        </p>
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-r-2 p-1"
        >
          <PiArrowFatDown className="size-8" />
        </Button>
        <Button
          variant={"ghost"}
          className="size-9 flex-shrink-0 border-r-2 p-1"
        >
          <PiSmiley className="size-8" />
        </Button>
        <Input className="w-full border-0" placeholder="Comment..."></Input>
      </div>
    </div>
  );
}
