"use client";

import { PostData } from "@/lib/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { RiUser4Fill } from "react-icons/ri";
import { Button } from "../ui/button";
import { PiArrowFatDown, PiArrowFatUp, PiSmiley } from "react-icons/pi";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";

export default function DisplayPost({ post }: { post: PostData }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
    editable: false,
  });

  const user = post.user;

  return (
    <div className="flex flex-col border-b-2 border-r-2">
      <div className="flex flex-row border-b-2">
        <div className="flex items-center border-r-2 p-2">
          {user?.image ? (
            <Image
              src={user?.image || ""}
              alt={user?.name || "warga biasa"}
              width={24}
              height={24}
              className="size-9 rounded-full lg:size-8"
            />
          ) : (
            <RiUser4Fill className="size-9 lg:size-8" />
          )}
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
