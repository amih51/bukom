import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitPost } from "./submit-post";
import { toast } from "sonner";

export function useSubmitPostMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: SubmitPost,
    onSuccess: () => {
      toast.success("Post submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to submit post.");
    },
  });
  return mutation;
}
