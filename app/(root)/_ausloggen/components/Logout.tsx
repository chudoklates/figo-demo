"use client";

import { LOGOUT } from "@/api/mutations/user";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "@/lib/context/UserContext";
import { clearToken } from "@/lib/auth/utils";
import { getInternalErrorCode, getNetworkErrorCode } from "@/utils/error";

export default function Logout() {
  const { user } = useContext(UserContext);

  const [logout, { client }] = useMutation<{ logoutMe: boolean }>(LOGOUT, {
    update(_cache, { data }) {
      if (!data?.logoutMe) return;

      clearToken();

      // Clear cache
      client.resetStore().catch(); // Note: due to authentication errors, this throws; Issue link: https://github.com/apollographql/apollo-client/issues/10447
    },
    onError(error) {
      if (getInternalErrorCode(error) === "TOKEN_MISSING_IN_REQUEST") {
        // User is most likely logged out already; Clear cache
        client.resetStore().catch();
      }
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }

    const timeout = setTimeout(() => {
      logout();
      router.replace("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [logout, router, user]);

  return null;
}
