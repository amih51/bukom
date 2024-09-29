import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GoLaw } from "react-icons/go";

export default function Rules({
  defaultOpen = false,
  button = false,
}: {
  defaultOpen?: boolean;
  button?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true);
    }
  }, [defaultOpen]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={openDialog}
        className={
          !button ? "hidden" : "size-full justify-start p-2 font-normal"
        }
        variant={"ghost"}
      >
        <GoLaw className="mr-2 size-4" />
        Rules
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-[94%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Community Rules</AlertDialogTitle>
            <AlertDialogDescription>
              Please review and accept the rules before proceeding:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ul className="list-disc pl-5">
            <li>Be respectful to others.</li>
            <li>No spamming.</li>
            <li>
              No hate speech, including derogatory comments and discrimination.
            </li>
            <li>No pornography or sexually explicit content.</li>
            <li>
              No misuse of anonymity, including harassment or illegal
              activities.
            </li>
            <li>
              Use anonymous features wisely, as you would expect of an educated
              individual.
            </li>
          </ul>
          <AlertDialogFooter>
            <Button onClick={closeDialog}>Accept</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
