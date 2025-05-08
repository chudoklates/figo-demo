"use client";

import { Pagination, PaginationItem, PaginationProps } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function EventsPagination(props: PaginationProps) {
  const baseUrl = usePathname();
  const readOnlySearchParams = useSearchParams();

  const getHref = (page: number | null) => {
    const searchParams = new URLSearchParams(readOnlySearchParams.toString());

    if (!page || page === 1) {
      searchParams.delete("page");
      return `${baseUrl}?${searchParams.toString()}`;
    }

    searchParams.set("page", page.toString());

    return `${baseUrl}?${searchParams.toString()}`;
  };

  return (
    <Pagination
      renderItem={(item) => (
        <PaginationItem component={Link} href={getHref(item.page)} {...item} />
      )}
      siblingCount={0}
      boundaryCount={1}
      {...props}
    />
  );
}
