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
        onClick={() => upvote()}
        variant={"ghost"}
        className="size-9 flex-shrink-0 border-b-2 border-l-2 border-r p-1 sm:border-l-0"
      >
        {data?.voteType === true ? (
          <PiArrowFatUpFill className="size-5" />
        ) : (
          <PiArrowFatUp className="size-5" />
        )}
      </Button>

      <p className="flex size-9 items-center justify-center border-b-2 border-r text-xl">
        {data?.votes}
      </p>

      <Button
        onClick={() => downvote()}
        variant={"ghost"}
        className="size-9 flex-shrink-0 border-b-2 border-r-2 p-1"
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
