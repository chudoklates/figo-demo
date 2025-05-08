"use client";

import React, { useEffect } from "react";

import { GET_USER } from "@/graphql/queries/users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Loading } from "@/components";

/**
 * Prevent restricted content from being pre-rendered before the user is authenticated.
 * @returns
 */
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, error } = useQuery(GET_USER);

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && error) {
      const encodedSearchParams = encodeURIComponent(searchParams.toString());

      router.replace(`/einloggen?to=${pathname}&query=${encodedSearchParams}`);
    }
  }, [loading, error, router, pathname, searchParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return children;
}
