"use client";

import React, { PropsWithChildren, Suspense, use } from "react";

import { useSearchParams } from "next/navigation";

interface RegisterProps extends PropsWithChildren {
  success: React.ReactNode;
  form: React.ReactNode;
}

const Register = ({ success, form }: RegisterProps) => {
  const params = useSearchParams();

  const successfullyRegistered = params.get("success");

  return successfullyRegistered ? success : form;
};

export default function RegisterWrapper({
  success,
  form,
  children,
}: RegisterProps) {
  return (
    <Suspense>
      {children}
      <Register success={success} form={form} />
    </Suspense>
  );
}
