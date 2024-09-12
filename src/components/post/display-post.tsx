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
import { PiChat } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MathExtension from "@aarkue/tiptap-math-extension";
import Link from "next/link";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import DeleteButton from "./delete/delete-btn";
import { useSession } from "next-auth/react";
import VoteButton from "./vote-btn";
import BookmarkButton from "./bookmark-btn";
const lowlight = createLowlight(all);

export default function DisplayPost({ post }: { post: PostData }) {
  const session = useSession();
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
  const trueVotes = post.votes.filter((vote) => vote.voteType === true).length;
  const falseVotes = post.votes.filter(
    (vote) => vote.voteType === false,
  ).length;
  const voteDifference = trueVotes - falseVotes;

  return (
    <div className="group/del flex flex-col border-t py-2 sm:border-l-0">
      <div className="flex flex-row sm:border-l-0">
        <div className="flex w-full flex-row overflow-hidden">
          <Link href={`/${user.username}`} className="flex items-center p-2">
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
              <div className="flex flex-row overflow-hidden text-sm">
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
          {post.userId === session.data?.user.id && (
            <DeleteButton post={post} />
          )}
        </div>
      </div>
      <EditorContent editor={editor} className="min-h-16 p-2"></EditorContent>
      <div className="flex flex-row gap-5 overflow-hidden">
        <VoteButton
          postId={post.id}
          initialState={{
            votes: voteDifference,
            voteType:
              post.votes.find((vote) => vote.userId === session.data?.user.id)
                ?.voteType ?? null,
          }}
        />
        <Button
          variant={"secondary"}
          className="h-full w-fit flex-shrink-0 p-2"
        >
          <Link
            href={`/${post.user.username}/post/${post.id}`}
            className="flex flex-row items-center justify-center"
          >
            <PiChat className="mr-1 size-5 flex-shrink-0" />
            <p className="text-sm">{post._count.replies}</p>
          </Link>
        </Button>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.find(
              (bookmark) => bookmark.userId === session.data?.user.id,
            )
              ? true
              : false,
          }}
        />
      </div>
    </div>
  );
}
