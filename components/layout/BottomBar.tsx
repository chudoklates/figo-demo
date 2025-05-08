import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Image from "next/image";
import {
  MailOutline,
  PhoneOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import { arima } from "@/theme/fonts";
import SocialsSmall from "./components/SocialsSmall";

export default function BottomBar() {
  return (
    <Stack
      sx={{
        position: "relative",
        overflowX: "clip",
      }}
      component="footer"
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="89"
        preserveAspectRatio="none"
        viewBox="0 0 1439 89"
        fill="none"
        style={{ position: "absolute", top: "-89px" }}
      >
        <path d="M0 0L1439 89H0V0Z" fill="#FB9266" />
      </svg> */}
      <Box
        component="footer"
        sx={{
          bgcolor: "secondary.main",
        }}
      >
        <Grid2
          container
          direction="row"
          wrap="wrap"
          sx={{
            rowGap: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "stretch",
            pt: 8,
            pb: 3,
            px: { xs: 2, md: 13 },
          }}
        >
          <Grid2
            container
            wrap="wrap"
            sx={{
              rowGap: 5,
              columnGap: 3,
            }}
            size={12}
          >
            <Grid2
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              size={{
                xs: 12,
                lg: "grow",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 118, md: 208 },
                  height: { xs: 77, md: 138 },
                }}
              >
                <Image
                  src="/figo_white.svg"
                  alt="logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: "auto",
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ fontFamily: arima.style.fontFamily }}
              >
                Kontakt
              </Typography>
              <Stack
                spacing={1}
                sx={{
                  mt: 3,
                  mb: 3,
                }}
              >
                <Link
                  href="#"
                  color="inherit"
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <MailOutline />
                  ***REMOVED***
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <PhoneOutlined />
                  ***REMOVED***{" "}
                  <Typography sx={{ color: "rgba(13, 17, 56, 0.50)" }}>
                    (WhatsApp)
                  </Typography>
                </Link>
                <Typography
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <ScheduleOutlined />
                  10:00-18:00 Uhr Montag bis Freitag
                </Typography>
              </Stack>
              <SocialsSmall />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: "auto",
                lg: "grow",
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ fontFamily: arima.style.fontFamily }}
              >
                Wo wir sind
              </Typography>
              <Typography
                sx={{
                  mt: 3,
                }}
              >
                ***REMOVED***
              </Typography>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: "auto",
                lg: "grow",
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ fontFamily: arima.style.fontFamily }}
              >
                Haben Sie Fragen?
              </Typography>
              <Stack
                spacing={1}
                sx={{
                  mt: 3,
                }}
              >
                <Link
                  component={NextLink}
                  href="/faq"
                  color="inherit"
                  underline="always"
                >
                  FAQ einsehen
                </Link>
              </Stack>
            </Grid2>
            {/* <Grid2
              size={{
                xs: 12,
                sm: "grow",
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ fontFamily: arima.style.fontFamily }}
              >
                Info
              </Typography>
              <Stack
                spacing={1}
                sx={{
                  mt: 3,
                }}
              >
                {routes.map((route) => (
                  <Link
                    component={NextLink}
                    href={route.path}
                    key={route.path}
                    color="inherit"
                  >
                    {route.label}
                  </Link>
                ))}
              </Stack>
            </Grid2> */}
          </Grid2>
          <Grid2 size={12}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 0 }}
              sx={{
                justifyContent: "space-between",
                color: "grey.800",
              }}
            >
              <Typography color="inherit">© 2025 — Copyright</Typography>
              <Typography
                color="inherit"
                sx={{
                  pr: { xs: 11, md: 0 },
                }}
              >
                <Link
                  component={NextLink}
                  href="/datenschutz"
                  color="inherit"
                  underline="always"
                >
                  Datenschutz
                </Link>{" "}
                ·{" "}
                <Link
                  component={NextLink}
                  href="/impressum"
                  color="inherit"
                  underline="always"
                >
                  Impressum
                </Link>
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
}
