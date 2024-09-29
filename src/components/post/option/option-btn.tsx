import { PostData } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiDotsThree, PiTrash } from "react-icons/pi";
import DeletePostDialog from "./delete-post-dialog";
import ReportButton from "./report-btn";
import { useSession } from "next-auth/react";

export default function OptionButton({ post }: { post: PostData }) {
  const { data: session } = useSession();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Options"
            variant={"ghost"}
            className="h-fit flex-shrink-0 p-2"
          >
            <PiDotsThree className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          {post.userId === session?.user.id ? (
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <PiTrash className="size-4" />
                Delete
              </span>
            </DropdownMenuItem>
          ) : (
            <ReportButton
              postId={post.id}
              initialState={{
                isReportedByUser: post.reports.find(
                  (report) => report.userId === session?.user.id,
                )
                  ? true
                  : false,
              }}
            />
          )}
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
