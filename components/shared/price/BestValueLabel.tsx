import { Chip } from "@mui/material";

export default function BestValueLabel({ label }: { label: string }) {
  return (
    <Chip
      label={label}
      sx={{
        position: "absolute",
        bottom: -51,
        right: 17.6,
        left: { xs: 17.6, md: "unset" },
        margin: "0 auto",
        zIndex: 1,
        backgroundImage: 'url("/label-background.svg")',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        borderRadius: 0,
        bgcolor: "transparent !important",
        width: { xs: "calc(100% - 36px)", md: 351 },
        height: 51,
        fontWeight: 700,
        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    />
  );
}
