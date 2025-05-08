import { Stack } from "@mui/material";
import LandingSplit from "./components/LandingSplit";
import Container from "@mui/material/Container";
import { SectionTitle } from "./components";
import React from "react";
import {
  CalendarMonth,
  Diversity1,
  PaletteOutlined,
} from "@mui/icons-material";

const ITEMS = [
  {
    title: "Vielfältige Auswahl",
    subtitle:
      "Ob Sie Ihre künstlerische Seite beim Malen und Zeichnen ausleben möchten, sich bei Yoga und Tai Chi entspannen wollen oder neue Sprachen erlernen - die Möglichkeiten sind grenzenlos.",
    Icon: PaletteOutlined,
  },
  {
    title: "Flexibel und günstig",
    subtitle:
      "Mit unserem monatlich kündbaren Spar-Abo oder unsere Mehrfachkarten müssen Sie keine Kompromisse eingehen. Sie entscheiden, wie Sie Ihre Lieblingsaktivitäten genießen möchten.",
    Icon: CalendarMonth,
  },
  {
    title: "Gemeinsam neues entdecken",
    subtitle:
      "Wir möchten eine Community ins Leben rufen, die Menschen mit gleichen Interessen verbindet, bei der Menschen jeden Alters zusammenfinden - ganz natürlich und individuell.",
    Icon: Diversity1,
  },
];

export default function Features({ items = ITEMS }) {
  return (
    <Stack
      spacing={2.5}
      component="section"
      sx={{
        px: 2,
        py: 12.5,
        bgcolor: "secondary.main",
        alignItems: "center",
      }}
    >
      <SectionTitle id="features" title="Entdecken Sie unser Angebot" />
      <Container maxWidth="lg" disableGutters>
        <LandingSplit items={items} />
      </Container>
    </Stack>
  );
}
