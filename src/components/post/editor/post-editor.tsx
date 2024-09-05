"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import "./styles.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RiUser4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { SubmitPost } from "@/app/api/post/submit-post";

export default function PostEditor() {
  const { data: session } = useSession();
  const user = session?.user;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Hey what's happening?" }),
    ],
    immediatelyRender: false,
  });

  const input = editor?.getText({ blockSeparator: "\n" }) || "";

  async function onSubmit() {
    await SubmitPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex w-full flex-row border-b-2 border-l-2 border-r-2 sm:border-l-0">
      <div className="flex items-center border-r-2 p-2">
        {user?.image ? (
          <Image
            src={user?.image || ""}
            alt={user?.name || "warga biasa"}
            width={24}
            height={24}
            className="size-6 rounded-full lg:size-8"
          />
        ) : (
          <RiUser4Fill className="size-6 lg:size-8" />
        )}
      </div>
      <div className="flex w-full flex-col">
        <EditorContent editor={editor} className="border-b-2 p-2" />
        <Button onClick={onSubmit} disabled={!input.trim()} variant={"ghost"}>
          Submit
        </Button>
      </div>
    </div>
  );
}
