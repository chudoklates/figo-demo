import { CategoryKey } from "../types";
import egnokaBow from "@/public/egnoka-bow.webp";
import creativeWriting from "@/public/creative-writing.webp";
import meditation from "@/public/meditation.webp";
// import yogaLadies from "@/public/landing-pages/yoga/yoga-ladies.webp";
// import doubleYoga from "@/public/landing-pages/yoga/double-yoga.webp";
// import kettlebells from "@/public/landing-pages/yoga/kettlebells.webp";
// import paintingAlt from "@/public/landing-pages/yoga/painting-alt.webp";
// import shengZhen from "@/public/landing-pages/yoga/shengzhen.webp";
// import yogaHip from "@/public/landing-pages/yoga/yoga-hip.webp";
// import doubleQigong from "@/public/landing-pages/qigong/double-qigong.webp";
// import qigongPark from "@/public/landing-pages/qigong/qigong-park.webp";
// import yogaSenior from "@/public/landing-pages/qigong/yoga-senior.webp";
// import dancingFull from "@/public/dancing-class-full.webp";
// import doubleDancing from "@/public/landing-pages/tanzen/double-dancing.webp";
// import egnokaQigong from "@/public/landing-pages/tanzen/egnoka-qigong.webp";
// import yogaWarrior from "@/public/landing-pages/tanzen/yoga-warrior.webp";
// import creativeWriting from "@/public/creative-writing.webp";
// import doubleArt from "@/public/landing-pages/kunst/double-art.webp";
// import paintingHero from "@/public/landing-pages/kunst/painting-hero.webp";
// import {
//   SelfImprovement,
//   CalendarMonth,
//   Diversity1,
//   PaletteOutlined,
//   SportsGymnastics,
// } from "@mui/icons-material";

export const AVAILABLE_CATEGORIES: CategoryKey[] = [
  "yoga",
  // "tanzen",
  // "qigong",
  // "kunst",
];

// const getTitle = (category: string) => {
//   return (
//     <React.Fragment>
//       Berlins beste {category}kurse,{" "}
//       <Typography
//         variant="inherit"
//         component="span"
//         sx={{ color: "secondary.main" }}
//       >
//         einfach gebucht
//       </Typography>
//     </React.Fragment>
//   );
// };

export const OVERRIDES = {
  yoga: {
    Hero: {},
    Features: {},
    BackgroundSection: {
      images: [
        {
          src: egnokaBow,
          alt: "Qigong",
        },
        {
          src: creativeWriting,
          alt: "Kreatives Schreiben",
        },
        {
          src: meditation,
          alt: "Meditation",
        },
      ],
    },
  },
};

// Old overrides, saving just in case

// export const OVERRIDES = {
//   yoga: {
//     Hero: {
//       title: getTitle("Yoga"),
//       image: yogaLadies,
//     },
//     Features: {
//       items: [
//         {
//           Icon: SelfImprovement,
//           title: "Vielfältige Auswahl",
//           subtitle:
//             "Yoga in all seinen Facetten: Erleben Sie die Ruhe des Yin Yoga, die Dynamik des Vinyasa oder die Präzision des Hatha Yoga. Wir haben bestimmt den passenden Kurs für Sie.",
//         },
//         {
//           Icon: CalendarMonth,
//           title: "Flexibel und günstig",
//           subtitle:
//             "Mit unserem monatlich kündbaren Spar-Abo oder unsere Mehrfachkarten müssen Sie keine Kompromisse eingehen. Sie entscheiden, wie Sie Ihre Lieblingsaktivitäten genießen möchten.",
//         },
//         {
//           Icon: Diversity1,
//           title: "Gemeinsam neues entdecken",
//           subtitle:
//             "Wir möchten eine Community ins Leben rufen, die Menschen mit gleichen Interessen verbindet, bei der Menschen jeden Alters zusammenfinden - ganz natürlich und individuell.",
//         },
//       ],
//     },
//     HeroSection: {
//       subtitle: "Kraft und Flexibilität vereinen",
//       description:
//         "Bei uns finden Sie Yogakurse in Ihrer Nähe, die Körper und Geist ansprechen. Mit Figo wird Ihre Freizeit zum aktiven Vergnügen.",
//       cta: {
//         href: '/kurskatalog?categories=["yoga"]',
//         label: "Yogakurse entdecken",
//       },
//       image: doubleYoga,
//       imgAlt: "Yogakurse",
//     },
//     BackgroundSection: {
//       description:
//         "Mehr als nur Yoga: entdecken Sie zahlreiche Aktivitäten in Ihrer Nähe.",
//       images: [
//         {
//           src: yogaHip,
//           alt: "Yoga",
//         },
//         {
//           src: shengZhen,
//           alt: "Sheng Zhen Gong",
//         },
//         {
//           src: paintingAlt,
//           alt: "Malen",
//         },
//         {
//           src: kettlebells,
//           alt: "Kraft",
//         },
//       ],
//     },
//   },
//   qigong: {
//     Hero: {
//       title: getTitle("Qigong-"),
//       image: qigongPark,
//     },
//     Features: {
//       items: [
//         {
//           Icon: SportsGymnastics,
//           title: "Vielfältige Auswahl",
//           subtitle:
//             "Entdecken Sie die Vielfalt des Qigong: Von sanften Meditationsformen bis hin zu fließenden Bewegungsabläufen. Wir haben den richtigen Kurs für jeden Geschmack und jedes Niveau.",
//         },
//         {
//           Icon: CalendarMonth,
//           title: "Flexibel und günstig",
//           subtitle:
//             "Mit unserem monatlich kündbaren Spar-Abo oder unsere Mehrfachkarten müssen Sie keine Kompromisse eingehen. Sie entscheiden, wie Sie Ihre Lieblingsaktivitäten genießen möchten.",
//         },
//         {
//           Icon: Diversity1,
//           title: "Gemeinsam neues entdecken",
//           subtitle:
//             "Wir möchten eine Community ins Leben rufen, die Menschen mit gleichen Interessen verbindet, bei der Menschen jeden Alters zusammenfinden - ganz natürlich und individuell.",
//         },
//       ],
//     },
//     HeroSection: {
//       image: doubleQigong,
//       imgAlt: "QiGong-Kurse",
//       subtitle: "die harmonisierende Wirkung von Qigong erleben",
//       description:
//         "Bei uns finden Sie Qigongkurse in Ihrer Nähe, die Körper und Geist ansprechen. Mit Figo wird Ihre Freizeit zum aktiven Vergnügen.",
//       cta: {
//         label: "QIGONGKURSE ENTDECKEN",
//         href: '/kurskatalog?categories=["qigong"]',
//       },
//     },
//     BackgroundSection: {
//       description:
//         "Mehr als nur Qigong: entdecken Sie zahlreiche Aktivitäten in Ihrer Nähe.",
//       images: [
//         {
//           src: kettlebells,
//           alt: "Kraft",
//         },
//         {
//           src: yogaSenior,
//           alt: "Yoga",
//         },
//         {
//           src: paintingAlt,
//           alt: "Malen",
//         },
//         {
//           src: dancingFull,
//           alt: "Tanzen",
//         },
//       ],
//     },
//   },
//   tanzen: {
//     Hero: {
//       title: getTitle("Tanz"),
//       image: yogaHip,
//     },
//     Features: {
//       items: [
//         {
//           Icon: SportsGymnastics,
//           title: "Vielfältige Auswahl",
//           subtitle:
//             "Erleben Sie die Vielfalt des Tanzes: Von schwungvollem Jazz über mitreißendes Zumba bis hin zu sinnlichem Bauchtanz und klassischem Ballett - wir haben den perfekten Kurs für Sie.",
//         },
//         {
//           Icon: CalendarMonth,
//           title: "Flexibel und günstig",
//           subtitle:
//             "Mit unserem monatlich kündbaren Spar-Abo oder unsere Mehrfachkarten müssen Sie keine Kompromisse eingehen. Sie entscheiden, wie Sie Ihre Lieblingsaktivitäten genießen möchten.",
//         },
//         {
//           Icon: Diversity1,
//           title: "Gemeinsam neues entdecken",
//           subtitle:
//             "Wir möchten eine Community ins Leben rufen, die Menschen mit gleichen Interessen verbindet, bei der Menschen jeden Alters zusammenfinden - ganz natürlich und individuell.",
//         },
//       ],
//     },
//     HeroSection: {
//       image: doubleDancing,
//       imgAlt: "Tanzkurse",
//       subtitle: "bewegen und Neues lernen",
//       description:
//         "Bei uns finden Sie Tanzkurse in Ihrer Nähe, die Spaß machen und fit halten. Mit Figo wird Ihre Freizeit zum aktiven Vergnügen.",
//       cta: {
//         label: "Tanzkurse entdecken",
//         href: '/kurskatalog?categories=["dancing"]',
//       },
//     },
//     BackgroundSection: {
//       description:
//         "Mehr als nur Tanz: entdecken Sie zahlreiche Aktivitäten in Ihrer Nähe.",
//       images: [
//         {
//           src: egnokaQigong,
//           alt: "Qigong",
//         },
//         {
//           src: paintingAlt,
//           alt: "Malen",
//         },
//         {
//           src: yogaLadies,
//           alt: "Yoga",
//         },
//         {
//           src: yogaWarrior,
//           alt: "Yoga",
//         },
//       ],
//     },
//   },
//   kunst: {
//     Hero: {
//       title: getTitle("Kunst"),
//       image: paintingHero,
//     },
//     Features: {
//       items: [
//         {
//           Icon: PaletteOutlined,
//           title: "Vielfältige Auswahl",
//           subtitle:
//             "Vom ausdrucksstarken Acrylmalen über das detailreiche Aktzeichnen. Bei uns finden Sie garantiert den passenden Kurs, um Ihre künstlerische Seite auszuleben.",
//         },
//         {
//           Icon: CalendarMonth,
//           title: "Flexibel und günstig",
//           subtitle:
//             "Mit unserem monatlich kündbaren Spar-Abo oder unsere Mehrfachkarten müssen Sie keine Kompromisse eingehen. Sie entscheiden, wie Sie Ihre Lieblingsaktivitäten genießen möchten.",
//         },
//         {
//           Icon: Diversity1,
//           title: "Gemeinsam neues entdecken",
//           subtitle:
//             "Wir möchten eine Community ins Leben rufen, die Menschen mit gleichen Interessen verbindet, bei der Menschen jeden Alters zusammenfinden - ganz natürlich und individuell.",
//         },
//       ],
//     },
//     HeroSection: {
//       image: doubleArt,
//       imgAlt: "Kunstkurse",
//       subtitle: "gestalten und Neues lernen",
//       description:
//         "Bei uns finden Sie Mal- und Zeichenkurse in Ihrer Nähe, die Kreativität freisetzen und Ihnen neue Techniken vermitteln. Mit Figo wird Ihre Freizeit zum künstlerischen Erlebnis.",
//       cta: {
//         label: "Kunstkurse entdecken",
//         href: '/kurskatalog?categories=["painting"%2C"drawing"%2C"macrame"%2C"creative_writing"]',
//       },
//     },
//     BackgroundSection: {
//       description:
//         "Mehr als nur Kunst: entdecken Sie zahlreiche Aktivitäten in Ihrer Nähe.",
//       images: [
//         {
//           src: creativeWriting,
//           alt: "Kreatives Schreiben",
//         },
//         {
//           src: egnokaQigong,
//           alt: "Qigong",
//         },
//         {
//           src: yogaLadies,
//           alt: "Yoga",
//         },
//         {
//           src: yogaHip,
//           alt: "Tanzen",
//         },
//       ],
//     },
//   },
// };
