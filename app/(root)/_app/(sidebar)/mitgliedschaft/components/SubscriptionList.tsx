// Deprecated as of [FIG-397];

// "use client";

// import { getProductsList, updateSubscription } from "@/app/actions/stripe";
// import {
//   SubscriptionCardHorizontal,
//   ResultSnackbar,
//   LoadingButton,
// } from "@/components";
// import { SubscriptionContext } from "@/lib/context/SubscriptionContext";
// import type { SubscriptionListProps } from "@/types/subscription";
// import { Box, Stack } from "@mui/material";
// import React, { useContext, useEffect } from "react";
// import Stripe from "stripe";
// import LoadingState from "../../../../../../components/shared/price/LoadingState";

// function SubscriptionList({ products }: SubscriptionListProps) {
//   const { subscription, product } = useContext(SubscriptionContext);

//   const [schedule, setSchedule] = React.useState<
//     Stripe.SubscriptionSchedule | null | undefined
//   >(subscription?.schedule);
//   const [loading, setLoading] = React.useState(false);
//   const [snackbar, setSnackbar] = React.useState<"success" | "error" | null>(
//     null
//   );
//   const [selectedSubscription, setSelectedSubscription] = React.useState<
//     string | null
//   >(null);

//   if (!subscription) return null;

//   const filteredProducts = products
//     .filter(
//       (product) => (product.default_price as Stripe.Price).type === "recurring"
//     )
//     .sort((a, b) => {
//       return parseInt(a.metadata.credits) - parseInt(b.metadata.credits);
//     });

//   const currentSubscriptionProductId = product?.id;

//   const subscriptionId = subscription?.id;

//   const upcomingSubscriptionProductId = (
//     schedule?.phases[1]?.items[0]?.price as Stripe.Price
//   )?.product as string;

//   const productName = products.find(
//     (product) => product.id === currentSubscriptionProductId
//   )?.name;

//   const upcomingProductName = products.find(
//     (product) => product.id === upcomingSubscriptionProductId
//   )?.name;

//   const scheduleChangeDate = schedule?.phases[1]?.start_date
//     ? new Date(schedule.phases[1].start_date * 1000).toLocaleDateString(
//         "de-DE",
//         {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//         }
//       )
//     : "";

//   const handleSubscriptionChange = async (productId: string) => {
//     try {
//       setLoading(true);
//       const result = await updateSubscription({
//         productId,
//         subscriptionId,
//       });
//       setSchedule(result.schedule);
//       setSelectedSubscription(null);
//       setSnackbar("success");
//     } catch (err) {
//       setSnackbar("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Stack spacing={3}>
//       {filteredProducts.map((product) => {
//         const selected = product.id === selectedSubscription;
//         const active = product.id === currentSubscriptionProductId;
//         const upcoming = product.id === upcomingSubscriptionProductId;

//         return (
//           <SubscriptionCardHorizontal
//             key={product.id}
//             active={active}
//             selected={selected}
//             upcomingDate={upcoming ? scheduleChangeDate : ""}
//             product={product}
//             setSelected={() =>
//               active || upcoming ? null : setSelectedSubscription(product.id)
//             }
//           />
//         );
//       })}
//       <ResultSnackbar
//         snackbarOpen={snackbar !== null}
//         closeSnackbar={() => setSnackbar(null)}
//         message={
//           snackbar === "success"
//             ? `Sie haben Ihr Abonnement (von ${productName} auf ${upcomingProductName}) geändert. Diese Veränderung wird ab dem Beginn des nächsten Zyklus wirksam.`
//             : "Es gab ein Problem beim Ändern Ihres Abonnements"
//         }
//         severity={snackbar!}
//       />
//       <Box width={320} alignSelf="center" pt={7}>
//         <LoadingButton
//           loading={loading}
//           variant="contained"
//           disabled={!selectedSubscription}
//           onClick={() =>
//             handleSubscriptionChange(selectedSubscription as string)
//           }
//           fullWidth
//           size="large"
//         >
//           Abonnement ändern
//         </LoadingButton>
//       </Box>
//     </Stack>
//   );
// }

// export default function SubscriptionListWrapper() {
//   const [products, setProducts] = React.useState<Stripe.Product[] | null>(null);

//   useEffect(() => {
//     getProductsList().then(setProducts);
//   }, []);

//   if (!products) {
//     return <LoadingState />;
//   }

//   return <SubscriptionList products={products} />;
// }
