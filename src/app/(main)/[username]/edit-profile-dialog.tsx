import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import LoadingButton from "@/components/loading-button";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import { useUpdateProfileMutation } from "./mutations";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EditProfileDialogProps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { data: session } = useSession();
  const loggedInUser = session?.user;
  const router = useRouter();

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name ?? undefined,
      username: user.username ?? undefined,
      bio: user.bio || "",
    },
  });

  const mutation = useUpdateProfileMutation();

  const username = useWatch({
    control: form.control,
    name: "username",
  });

  const { data: isUnique, isLoading: isCheckingUsername } = useQuery({
    queryKey: ["checkUsername", username],
    queryFn: async () => {
      if (!username) return false;
      const res = await ky
        .get(`/api/user/check-username?username=${username}`)
        .json<{ isUnique: boolean }>();
      return res.isUnique;
    },
    enabled: Boolean(username),
  });

  async function onSubmit(values: UpdateUserProfileValues) {
    if (!isUnique && username !== loggedInUser?.username) {
      form.setError("username", { message: "Username is already taken" });
      return;
    }

    mutation.mutate(
      { values },
      {
        onSuccess: () => {
          onOpenChange(false);
          if (username !== loggedInUser?.username) router.push("/");
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[96%] sm:w-4/5 lg:w-1/2">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your display name"
                      {...field}
                      className="border border-input focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your username"
                      {...field}
                      className="border border-input focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </FormControl>
                  {isCheckingUsername ? (
                    <p className="text-xs">Checking username...</p>
                  ) : isUnique === false &&
                    username != loggedInUser?.username ? (
                    <p className="text-xs text-destructive">
                      Username is already taken
                    </p>
                  ) : null}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
