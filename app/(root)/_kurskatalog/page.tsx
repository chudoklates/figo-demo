import { Metadata } from "next";
import Catalogue from "./components/Catalogue";

export const metadata: Metadata = {
  title: "Spannende Kurse und Freizeitaktivitäten",
  description:
    "Wählen Sie aus Sportkursen wie Yoga, Tai Chi, Qigong, Cantienica oder Kreativkursen wie Malen, Zeichnen, Singen, Theater und vielem mehr!",
};

export default function CataloguePage() {
  return <Catalogue />;
}
