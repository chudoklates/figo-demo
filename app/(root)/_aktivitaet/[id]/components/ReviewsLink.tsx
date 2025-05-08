"use client";

import { Link } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ReviewsLink({ children }: PropsWithChildren) {
  return (
    <Link
      href="#reviews"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("reviews")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
    >
      {children}
    </Link>
  );
}
