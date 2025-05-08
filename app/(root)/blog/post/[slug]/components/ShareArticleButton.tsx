import { ShareOutlined } from "@mui/icons-material";
import { Button, ButtonProps, Typography } from "@mui/material";

export default function ShareArticleButton(overrides: ButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      startIcon={<ShareOutlined color="inherit" />}
      disableRipple
      {...overrides}
      sx={{ display: "flex", alignItems: "center", gap: 2, ...overrides.sx }}
    >
      <Typography sx={{ fontWeight: 600 }}>Diesen Artikel teilen</Typography>
    </Button>
  );
}
