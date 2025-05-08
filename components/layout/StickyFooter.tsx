import { Paper, Toolbar } from "@mui/material";

export default function StickyFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        position: "sticky",
        bottom: 0,
        top: "auto",
        borderRadius: 0,
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <Toolbar
        sx={{
          py: 2.5,
          px: "0px !important",
        }}
      >
        {children}
      </Toolbar>
    </Paper>
  );
}
