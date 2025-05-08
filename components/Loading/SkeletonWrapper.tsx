import { Skeleton, SkeletonProps } from "@mui/material";

export default function SkeletonWrapper({
  loading,
  children,
  ...rest
}: SkeletonProps & { loading: boolean }) {
  if (loading) {
    return (
      <Skeleton variant="rectangular" {...rest}>
        {children}
      </Skeleton>
    );
  }

  return children;
}
