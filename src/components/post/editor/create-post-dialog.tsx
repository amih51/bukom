"use client";

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
import { GoPencil } from "react-icons/go";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubmitPostMutation } from "./mutations-post";
import { BsIncognito } from "react-icons/bs";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { Category } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function CreatePostDialog() {
  const { data: session } = useSession();
  const user = session?.user;
  const mutation = useSubmitPostMutation();
  const [isAnon, setIsAnon] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const query = useQuery({
    queryKey: ["category"],
    queryFn: () => kyInstance.get("/api/category").json<Category[]>(),
  });
  const categories = query.data || [];

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

  const handleCategorySelect = (id: string) => {
    setCategoryId(id);
    setIsOpen(false);
  };

  function onSubmit() {
    mutation.mutate(
      { input: editor?.getHTML() || "", categoryId, isAnon },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
        },
      },
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          className="flex h-fit w-fit items-center justify-start lg:w-full"
        >
          <GoPencil className="size-6 flex-shrink-0" />
          <p className="ml-2 hidden truncate lg:inline">Create Post</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[94%] p-0 lg:max-w-4xl">
        <div className="my-6 overflow-auto">
          <div className="sm:mx-6">
            <DialogTitle className="mb-5 text-xl">Create Menfess</DialogTitle>
            <div className="flex w-full flex-row">
              <Avatar className="mr-5 size-12">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>{user?.username}</AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col gap-5 overflow-auto">
                <EditorContent
                  editor={editor}
                  className="max-h-[75vh] min-h-52 overflow-auto rounded-lg border border-border p-2 scrollbar scrollbar-thumb-current scrollbar-w-1 hover:scrollbar-thumb-foreground/50"
                />
                <div className="flex flex-row gap-5">
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {categories.find(
                          (category) => category.id === categoryId,
                        )?.name || "Select a category"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[45vw] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {categories.length > 0 ? (
                              categories.map((category) => (
                                <CommandItem
                                  key={category.id}
                                  onSelect={() =>
                                    handleCategorySelect(category.id)
                                  }
                                >
                                  {category.name}
                                </CommandItem>
                              ))
                            ) : (
                              <CommandItem>No categories available</CommandItem>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-row">
                    <Button
                      onClick={() => setIsAnon((prev) => !prev)}
                      variant={isAnon ? "revert" : "outline"}
                      className="rounded-r-none"
                    >
                      <BsIncognito className="size-5" />
                    </Button>
                    <DialogClose
                      disabled={!editor?.getText().trim() || categoryId === ""}
                      className="flex w-full flex-row"
                    >
                      <LoadingButton
                        loading={mutation.isPending}
                        onClick={onSubmit}
                        disabled={
                          !editor?.getText().trim() || categoryId === ""
                        }
                        variant={"outline"}
                        className="w-full rounded-l-none"
                      >
                        Submit
                      </LoadingButton>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
