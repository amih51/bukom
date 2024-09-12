import { PostData } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThree, PiDotsThreeVerticalBold, PiTrash } from "react-icons/pi";
import DeletePostDialog from "./delete-post-dialog";

export default function DeleteButton({ post }: { post: PostData }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-fit flex-shrink-0 p-2">
            <PiDotsThree className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-3 text-destructive">
              <PiTrash className="size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        post={post}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
