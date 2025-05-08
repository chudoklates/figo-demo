"use client";

import { Link } from "@mui/material";

export default function MapLink() {
  return (
    <Link
      href="#map"
      color="grey.700"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("map")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
      underline="always"
      sx={{
        fontSize: 16,
      }}
    >
      Auf der Karte einsehen
    </Link>
  );
}
