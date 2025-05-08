import { Stack, Typography } from "@mui/material";
// import NewsletterSignupForm from "./NewsletterSignupForm";

export default function NewsletterSignup({
  heading = "Ihr Weg zu geselligen Treffen",
  subtitle = "Lassen Sie sich von uns persönlich informieren, wenn wir ein Treffen in Ihrer Nähe organisieren.",
  mainHeading = false,
}: {
  heading?: string;
  subtitle?: React.ReactNode;
  mainHeading?: boolean;
}) {
  return (
    <Stack spacing={2.5}>
      <Typography variant={mainHeading ? "h0" : "h2"}>{heading}</Typography>
      <Typography>{subtitle}</Typography>
      {/* <NewsletterSignupForm suffix={mainHeading ? "-main" : "-bottom"} /> */}
    </Stack>
  );
}
