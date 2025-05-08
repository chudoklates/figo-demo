import {
  OldHero as Hero,
  // HeroSection,
  BackgroundSection,
  LandingList,
  // AboutUs,
  Opinions,
  Features,
  CategoriesSection,
  ClosingSection,
} from "@/components/old-landing";
import { Stack } from "@mui/material";
import { Metadata } from "next";
import { AVAILABLE_CATEGORIES, OVERRIDES } from "./constants";
import { redirect, RedirectType } from "next/navigation";
import { CategoryKey } from "./types";

export const metadata: Metadata = {
  title: "Figo - Berlins spannendste Freizeitkurse einfach online buchen",
  description:
    "Entdecken Sie vielfältige Kurse in Ihrer Nähe: Von Yoga bis Malerei. Flexible Buchung mit Spar-Abo oder Mehrfachkarten. Ideal für ein aktives Leben in Ihrem Kiez. Jetzt kostenlos testen!",
  robots: "noindex, nofollow",
};

export default async function LandingPage(props: {
  params: Promise<{ [x: string]: string }>;
}) {
  const params = await props.params;
  const category = params.category as CategoryKey | undefined;

  if (!category || !AVAILABLE_CATEGORIES.includes(category)) {
    return redirect("/", RedirectType.replace);
  }

  const overrides = OVERRIDES[category];

  return (
    <Stack
      sx={{ pt: { xs: "58px", sm: "66px", lg: "90px" }, width: "100%" }}
      component="main"
    >
      <Hero {...overrides.Hero} />
      <Features {...overrides.Features} />
      {/* <HeroSection /> */}
      <BackgroundSection {...overrides.BackgroundSection} />
      <LandingList />
      <Opinions />
      {/* <AboutUs /> */}
      <CategoriesSection />
      <ClosingSection />
    </Stack>
  );
}

export async function generateStaticParams() {
  return AVAILABLE_CATEGORIES.map((category) => ({
    category,
  }));
}
