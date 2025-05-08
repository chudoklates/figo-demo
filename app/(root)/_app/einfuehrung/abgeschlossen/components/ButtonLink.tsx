"use client";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Link from "next/link";

import { useContext } from "react";
import { UserContext } from "@/lib/context/UserContext";
import { getUrlEncodedID } from "@/utils/activity";

export default function ButtonLink() {
  const { user } = useContext(UserContext);

  const activityId = user?.auto_book_activity;

  const activityLink =
    activityId && `/aktivitaet/${getUrlEncodedID(activityId)}?auto=1`;

  return (
    <Box
      sx={{
        width: 292,
      }}
    >
      <Link href={activityLink ? activityLink : "/kurskatalog"} replace>
        <Button size="large" variant="contained" fullWidth>
          {activityId ? "Buchung abschließen" : "Ihre erste Aktivität finden"}
        </Button>
      </Link>
    </Box>
  );
}
