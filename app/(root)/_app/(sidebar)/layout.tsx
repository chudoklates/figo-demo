import { PageContainer, AppSidebar } from "@/components";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer
      boxOverrides={{ sx: { pt: 0, pb: 0 } }}
      containerOverrides={{ disableGutters: true, maxWidth: false }}
    >
      <Grid2
        container
        sx={{
          pt: { xs: "58px", sm: "64px", lg: "90px" },
          minHeight: "inherit",
        }}
      >
        <Grid2
          component={Paper}
          // inherited from Paper
          elevation={4}
          sx={{
            display: { xs: "none", md: "initial" },
            pb: "20vh",
            borderRadius: 0,
          }}
          size={{
            md: 3,
          }}
        >
          <AppSidebar />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 9,
          }}
        >
          {children}
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
