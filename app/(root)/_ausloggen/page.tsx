import Typography from "@mui/material/Typography";
import { PageContainer } from "@/components";
import Logout from "./components/Logout";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function LogoutPage() {
  return (
    <PageContainer>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        Bis bald! ✨
      </Typography>
      <Logout />
    </PageContainer>
  );
}
