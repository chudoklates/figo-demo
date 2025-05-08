/**
 * @deprecated
 */
// import {
//   Box,
//   Button,
//   Container,
//   Grid2,
//   Stack,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import dualActivity from "@/public/dual-activity.webp";
// import { ArrowForward } from "@mui/icons-material";
// import CTAButton from "./components/CTAButton";

// export default function HeroSection({
//   title = "Mit Figo",
//   subtitle = "bewegen, gestalten und Neues lernen",
//   description = "Mit Figo können Sie Ihre Freizeit aktiv und abwechslungsreich gestalten. Bei uns finden Sie Kurse und Aktivitäten, die Körper und Geist ansprechen.",
//   cta = { label: "Aktivitäten entdecken", href: "/kurskatalog" },
//   image = dualActivity,
//   imgAlt = "Schwimmen und Tanzen",
// }) {
//   return (
//     <Container maxWidth={false} disableGutters component="section">
//       <Grid2
//         container
//         direction={{ xs: "column-reverse", lg: "row" }}
//         rowSpacing={8}
//         sx={{
//           pt: 4,
//           pb: { xs: 0, md: 8 },
//         }}
//       >
//         <Grid2 size="grow">
//           <Stack
//             sx={{
//               alignItems: "center",
//               px: { xs: 2, lg: 3 },
//               maxWidth: 600,
//               marginX: "auto",
//             }}
//           >
//             <Stack
//               spacing={4}
//               sx={{
//                 pt: { xs: 0, lg: 12 },
//                 pb: 8,
//                 textAlign: "center",
//               }}
//             >
//               <Typography variant="h2">
//                 {title}{" "}
//                 <Typography
//                   variant="inherit"
//                   component="span"
//                   color="secondary"
//                 >
//                   {subtitle}
//                 </Typography>
//               </Typography>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 400,
//                 }}
//               >
//                 {description}
//               </Typography>
//               <CTAButton
//                 href={cta.href}
//                 label={cta.label}
//                 endIcon={<ArrowForward />}
//               />
//             </Stack>
//           </Stack>
//         </Grid2>
//         <Grid2
//           sx={{
//             py: { xs: 0, lg: 4 },
//             position: "relative",
//             overflow: "hidden",
//           }}
//           size={{
//             xs: 12,
//             lg: 5,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               position: "relative",
//               height: "100%",
//               minHeight: { xs: 360, sm: 500 },

//               background: `radial-gradient(
//               ellipse at center,
//               rgba(0, 103, 190, 0.36),
//               #ffff 55%)
//               `,
//             }}
//           >
//             <Image
//               fill
//               sizes="(max-width: 499px) 100vw, 50vw"
//               alt={imgAlt}
//               src={image}
//               style={{ objectFit: "contain" }}
//             />
//           </Box>
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// }
