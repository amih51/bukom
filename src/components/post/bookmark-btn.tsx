import kyInstance from "@/lib/ky";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { PiBookmarkSimple, PiBookmarkSimpleFill } from "react-icons/pi";
import { BookmarkInfo } from "@/lib/types";

export default function BookmarkButton({
  postId,
  initialState,
}: {
  postId: string;
  initialState: BookmarkInfo;
}) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/post/${postId}/bookmark`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isBookmarkedByUser
        ? kyInstance.delete(`/api/post/${postId}/bookmark`)
        : kyInstance.post(`/api/post/${postId}/bookmark`),
    onMutate: async () => {
      toast(`Post ${data.isBookmarkedByUser ? "un" : ""}bookmarked`);

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={"ghost"}
      className="h-full flex-shrink-0 border-l-2 p-1"
    >
      {data?.isBookmarkedByUser === true ? (
        <PiBookmarkSimpleFill className="size-8" />
      ) : (
        <PiBookmarkSimple className="size-8" />
      )}
    </Button>
  );
}
