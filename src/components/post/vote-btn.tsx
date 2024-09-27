import kyInstance from "@/lib/ky";
import { VoteInfo } from "@/lib/types";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PiArrowFatDown,
  PiArrowFatDownFill,
  PiArrowFatUp,
  PiArrowFatUpFill,
} from "react-icons/pi";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function VoteButton({
  postId,
  initialState,
}: {
  postId: string;
  initialState: VoteInfo;
}) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["vote-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () => kyInstance.get(`/api/posts/${postId}/vote`).json<VoteInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate: upvote } = useMutation({
    mutationFn: () =>
      data?.voteType === true
        ? kyInstance.delete(`/api/post/${postId}/vote`)
        : kyInstance.post(`/api/post/${postId}/vote`, {
            json: { voteType: true },
          }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<VoteInfo>(queryKey);

      queryClient.setQueryData<VoteInfo>(queryKey, () => ({
        votes:
          (previousState?.votes || 0) +
          (previousState?.voteType === true
            ? -1
            : previousState?.voteType === false
              ? 2
              : 1),
        voteType: previousState?.voteType === true ? null : true,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const { mutate: downvote } = useMutation({
    mutationFn: () =>
      data?.voteType === false
        ? kyInstance.delete(`/api/post/${postId}/vote`)
        : kyInstance.post(`/api/post/${postId}/vote`, {
            json: { voteType: false },
          }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<VoteInfo>(queryKey);

      queryClient.setQueryData<VoteInfo>(queryKey, () => ({
        votes:
          (previousState?.votes || 0) +
          (previousState?.voteType === false
            ? 1
            : previousState?.voteType === true
              ? -2
              : -1),
        voteType: previousState?.voteType === false ? null : false,
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
    <div className="flex flex-row">
      <Button
        aria-label="Upvote"
        onClick={() => upvote()}
        variant={"secondary"}
        className="h-9 w-10 flex-shrink-0 rounded-r-none p-2 pr-1"
      >
        {data?.voteType === true ? (
          <PiArrowFatUpFill className="size-5" />
        ) : (
          <PiArrowFatUp className="size-5" />
        )}
      </Button>

      <p className="flex h-9 w-7 items-center justify-center bg-secondary text-sm text-secondary-foreground">
        {data?.votes}
      </p>

      <Button
        aria-label="Downvote"
        onClick={() => downvote()}
        variant={"secondary"}
        className="h-9 w-10 flex-shrink-0 rounded-l-none p-2 pl-1"
      >
        {data?.voteType === false ? (
          <PiArrowFatDownFill className="size-5" />
        ) : (
          <PiArrowFatDown className="size-5" />
        )}
      </Button>
    </div>
  );
}
