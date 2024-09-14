import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { PostsPage } from "@/lib/types";
import { submitReply } from "./submit-reply";

export function useSubmitReplyMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      input,
      parentId,
      categoryId,
      isAnon,
    }: {
      input: string;
      parentId: string;
      categoryId: string;
      isAnon: boolean;
    }) => submitReply(input, parentId, categoryId, isAnon),

    onMutate: async (variables) => {
      const { parentId } = variables;
      return { parentId };
    },

    onSuccess: async (newPost, _, context) => {
      const parentId = context?.parentId;

      const queryFilter: QueryFilters = {
        queryKey: ["feed", "replies", parentId],
      };

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
