import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { PostsPage } from "@/lib/types";
import { SubmitReply } from "./submit-reply";

export function useSubmitReplyMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ input, parentId }: { input: string; parentId: string }) =>
      SubmitReply(input, parentId),
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  ...firstPage,
                  posts: [newPost, ...firstPage.posts],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
      toast.success("Reply submitted successfully!");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to submit post.");
    },
  });
  return mutation;
}
