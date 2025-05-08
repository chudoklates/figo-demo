"use client";

import React, { createContext } from "react";

import { useQuery } from "@apollo/client";

import { GET_MY_PARTICIPANTS, GET_USER } from "@/graphql/queries/users";
import { Me, MyParticipantsType, User } from "@/graphql/types/user";
import { getAllFieldValues } from "@/utils/field";

export type UserContext = {
  user: User | null;
  loading: boolean;
};

export const UserContext = createContext<UserContext>({
  user: null,
  loading: true,
});

export const UserContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: participantData,
    loading: participantLoading,
    error: participantError,
  } = useQuery<{
    myParticipants: MyParticipantsType[];
  }>(GET_MY_PARTICIPANTS, {
    errorPolicy: "none",
  });

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<{
    me: Me;
  }>(GET_USER, {
    errorPolicy: "none",
  });

  const loading = participantLoading || userLoading;

  const userInfo = (!userError && userData?.me) || null;
  const participantInfo =
    (!participantError && participantData?.myParticipants?.[0]) || null;

  const user =
    userInfo && participantInfo
      ? ({
          email: userInfo.email,
          ...participantInfo,
          ...getAllFieldValues(participantInfo.fields),
        } as unknown as User)
      : null;

  return (
    <UserContext.Provider value={{ loading, user }}>
      {children}
    </UserContext.Provider>
  );
};
