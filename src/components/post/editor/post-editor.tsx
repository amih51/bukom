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

  async function onSubmit() {
    await SubmitPost(editor?.getHTML() || "");
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
        <EditorContent editor={editor} className="min-h-16 border-b-2 p-2" />
        <div className="flex w-full flex-row">
          <Button
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
            }}
            variant={"ghost"}
            className="border-r-2"
          >
            B
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!editor?.getHTML().trim()}
            variant={"ghost"}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
