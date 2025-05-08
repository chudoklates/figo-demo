"use client";

import { Event } from "@mui/icons-material";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/de";
import Image from "next/image";
import yogaEventPlaceholder from "@/public/yoga-event-placeholder.png";

dayjs.locale("de");
dayjs.extend(relativeTime);

const Thumbnail = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "auto",
  flexShrink: 0.5,
  [theme.breakpoints.up("sm")]: {
    flexBasis: 370,
  },
  objectFit: "contain",
}));

export default function UpcomingEventCard() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "stretch",
        borderRadius: { xs: 0, sm: "4px" },
      }}
    >
      <Thumbnail src={yogaEventPlaceholder} alt="Event placeholder" />
      <CardContent
        component={Stack}
        spacing={2}
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: { xs: "40px !important", sm: "24px !important" },
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ alignItems: "flex-start" }}>
          <Typography variant="h4" sx={{ mb: { xs: 1.25, sm: 2.5 } }}>
            Yoga Wellness Club
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: { xs: 2, sm: 3 } }}
          >
            <Event />
            <Typography>{dayjs("2024-09-20").format("MMMM, DD")}</Typography>
          </Stack>
          <Typography>
            Lorem ipsum dolor sit amet consectetur. Pulvinar est leo in ac mus
            elit.
          </Typography>
        </Stack>
        <Button size="large" variant="contained" fullWidth>
          Details einsehen
        </Button>
      </CardContent>
    </Card>
  );
}
