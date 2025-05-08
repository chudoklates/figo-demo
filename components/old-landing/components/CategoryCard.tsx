import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { arima } from "@/theme/fonts";
import Link from "next/link";

const TEXT_SHADOW =
  "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)";

export default function CategoryCard({
  category,
  background,
  href,
}: {
  category: string;
  background: StaticImageData;
  href: string;
}) {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "20px",
        width: { xs: "100%", sm: 255, md: 325 },
        height: { xs: 150, md: 200 },
        border: "none",
      }}
      variant="outlined"
    >
      <Image
        alt=""
        src={background}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 255px, 325px"
      />
      <CardActionArea
        sx={{ height: "100%" }}
        disableRipple
        href={href}
        LinkComponent={Link}
      >
        <CardContent
          sx={{
            background: "rgba(0, 0, 0, 0.40)",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontSize: 40,
              fontWeight: 700,
              fontFamily: arima.style.fontFamily,
              lineHeight: 1,
              textShadow: TEXT_SHADOW,
              wordWrap: { xs: "anywhere", md: "unset" },
              maxWidth: { xs: "100%", sm: 255, md: 325 },
              textAlign: "center",
            }}
          >
            {category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
