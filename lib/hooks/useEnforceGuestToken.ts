"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_GUEST } from "@/graphql/mutations/user";

export default function useEnforceQuestToken() {
  const [getToken] = useMutation(LOGIN_GUEST);

  const authToken =
    typeof window !== "undefined"
      ? localStorage.getItem("randevu-session-token")
      : null;

  useEffect(() => {
    if (!authToken) {
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return authToken;
}
