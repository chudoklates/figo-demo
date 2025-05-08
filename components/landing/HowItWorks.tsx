import { Box, Container, Stack, Typography } from "@mui/material";
import type {
  ComponentHowItWorksSection,
  HowItWorksItem,
} from "@/api/types/cms";
import { RichText } from "../cms/RichText";
import { ContentfulImage } from "../cms";
import CTA from "./components/CTA";

export default function HowItWorks({
  title,
  subtitle,
  itemsCollection,
  cta,
}: ComponentHowItWorksSection) {
  return (
    <Container maxWidth="xl">
      <Stack
        spacing={6.25}
        sx={{ py: { xs: 10, sm: 12.5 }, alignItems: "center" }}
      >
        <Stack spacing={2.5} sx={{ textAlign: { xs: "left", sm: "center" } }}>
          <Typography variant="h2">{title}</Typography>
          <RichText content={subtitle} />
        </Stack>
        <Stack
          spacing={6.25}
          direction={{ xs: "column", lg: "row" }}
          sx={{
            justifyContent: { xs: "stretch", lg: "center" },
          }}
        >
          {itemsCollection?.items.map((step, index) => (
            <StepCard key={step.sys.id} index={index} {...step} />
          ))}
        </Stack>
        <CTA {...cta} />
      </Stack>
    </Container>
  );
}

function StepCard({
  image,
  text,
  title,
  index,
}: HowItWorksItem & { index: number }) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        alignItems: "center",
        maxWidth: 380,
      }}
    >
      {image?.url && (
        <ContentfulImage
          src={image.url}
          alt={image.title || ""}
          width={410}
          height={330}
          style={{
            objectFit: "cover",
            height: 330,
            maxWidth: "100%",
            width: "auto",
          }}
        />
      )}
      <Stack direction="row" spacing={1}>
        <Typography variant="bodyLarge" sx={{ fontWeight: 700 }}>
          {index + 1}.
        </Typography>
        <Box>
          <Typography
            variant="bodyLarge"
            sx={{
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
          <Typography variant="bodyLarge">{text}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
