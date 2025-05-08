import { NavBar, BottomBar, ClosingSection } from "@/components";
import { Toolbar } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <NavBar />
      {/* Offsets the height of the page by the height of the toolbar to prevent content being hidden */}
      <Toolbar aria-hidden />
      {children}
      <ClosingSection />
      <BottomBar />
    </React.Fragment>
  );
}
