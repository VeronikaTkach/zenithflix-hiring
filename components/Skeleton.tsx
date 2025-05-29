import React from "react";

const SkeletonInner: React.FC<{ width?: string; height?: string }> = ({
  width = "100%",
  height = "120px",
}) => (
  <div
    style={{ width, height }}
    className="bg-gray-200 animate-pulse rounded"
  />
);

export const Skeleton = React.memo(SkeletonInner);

Skeleton.displayName = "Skeleton";
