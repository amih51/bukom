import kyInstance from "@/lib/ky";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ReportInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MdOutlineReport, MdReport } from "react-icons/md";

export default function ReportButton({
  postId,
  initialState,
}: {
  postId: string;
  initialState: ReportInfo;
}) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["report-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/post/${postId}/report`).json<ReportInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isReportedByUser
        ? kyInstance.delete(`/api/post/${postId}/report`)
        : kyInstance.post(`/api/post/${postId}/report`),
    onMutate: async () => {
      toast(`Post ${data.isReportedByUser ? "un" : ""}reported`);

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<ReportInfo>(queryKey);

      queryClient.setQueryData<ReportInfo>(queryKey, () => ({
        isReportedByUser: !previousState?.isReportedByUser,
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
      className="size-full flex-shrink-0 p-2 text-destructive hover:text-destructive"
    >
      {data?.isReportedByUser === true ? (
        <div className="flex flex-row gap-3">
          <MdReport className="size-4" />
          Unreport menfess
        </div>
      ) : (
        <div className="flex flex-row gap-3">
          <MdOutlineReport className="size-4" />
          Report menfess
        </div>
      )}
    </Button>
  );
}
