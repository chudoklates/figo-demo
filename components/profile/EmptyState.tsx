import { Box, Button, Stack, Typography } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type EmptyStateProps = {
  imgSrc: StaticImport;
  imgAlt: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export default function EmptyState({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Image src={imgSrc} alt={imgAlt} />
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Box
        sx={{
          width: 332,
          pt: 6,
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ py: 2.5 }}
          href={href}
          LinkComponent={Link}
        >
          {buttonText}
        </Button>
      </Box>
    </Stack>
  );
}
