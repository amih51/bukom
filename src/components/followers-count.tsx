"use client";

import useFollowerInfo from "@/hooks/use-follower-info";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
