import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";

export default function LoadingButton({
  loading,
  children,
  ...props
}: ButtonProps & { loading: boolean }) {
  return (
    <Button
      startIcon={
        <Box
          sx={{
            width: 20,
          }}
        />
      }
      disableRipple
      endIcon={
        loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <Box
            sx={{
              width: 20,
            }}
          />
        )
      }
      sx={{
        height: 52,
      }}
      {...props}
      {...(loading ? { disabled: true } : {})}
    >
      {children}
    </Button>
  );
}
