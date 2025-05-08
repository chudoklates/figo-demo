// Deprecated as of [FIG-397];

// "use server";

// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";

// import NextLink from "next/link";

// import { getProductsList } from "@/app/actions/stripe";
// import { ProductTypeButtonGroup, ProductList } from "@/components";
// import SubmitLink from "./components/SubmitLink";

// export default async function Plan() {
//   const products = await getProductsList();

//   return (
//     <Container component="main" maxWidth="xl">
//       <Stack spacing={4} pb={20} textAlign="center" alignItems="center">
//         <Typography variant="h3">Mitgliedschaft wählen</Typography>
//         <Typography
//           fontSize={18}
//           lineHeight="18px"
//           fontWeight={500}
//           display={{ xs: "block", lg: "none" }}
//         >
//           1. Wählen Sie Ihre Tarifoption
//         </Typography>
//         <ProductTypeButtonGroup />
//         <Typography
//           fontSize={18}
//           lineHeight="18px"
//           fontWeight={500}
//           display={{ xs: "block", lg: "none" }}
//         >
//           2. An wie viele Aktivitäten möchten Sie teilnehmen?
//         </Typography>
//         <ProductList products={products} />
//         <Stack width={320} spacing={4}>
//           <SubmitLink />
//           <NextLink href="/app/dashboard" replace>
//             <Button variant="text">Überspringen</Button>
//           </NextLink>
//         </Stack>
//         <Typography textAlign="center">
//           Alle unsere Mitgliedschaften sind{" "}
//           <Typography variant="inherit" component="span" fontWeight={700}>
//             monatlich kündbar
//           </Typography>
//           . Wenn Sie weitere Fragen haben, werfen Sie einen Blick auf unsere{" "}
//           <Link href="/faq" component={NextLink}>
//             FAQ
//           </Link>{" "}
//           oder{" "}
//           <Link href="#" component={NextLink}>
//             kontaktieren Sie uns
//           </Link>
//           !
//         </Typography>
//       </Stack>
//     </Container>
//   );
// }
