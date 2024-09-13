import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./submit-post";
import { toast } from "sonner";
import { PostsPage } from "@/lib/types";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ input, isAnon }: { input: string; isAnon: boolean }) =>
      submitPost(input, isAnon),
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
      toast.success("Post submitted successfully!");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to submit post.");
    },
  });
  return mutation;
}
