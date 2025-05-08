// "use client";

// import React, { useState, useEffect, useContext } from "react";
// import getStripe from "@/lib/payment/get-stripejs";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import Box from "@mui/material/Box";
// import {
//   createCheckoutSession,
//   retrieveCouponForUser,
// } from "@/app/actions/stripe";
// import { UserContext } from "@/lib/context/UserContext";
// import { useRouter } from "next/navigation";

// const stripePromise = getStripe();

// export default function CheckoutForm({
//   productId,
// }: {
//   productId: string | null;
// }) {
//   const { user } = useContext(UserContext);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       if (user?.email && user?.id && productId) {
//         // Create a Checkout Session as soon as the page loads
//         try {
//           let coupon;

//           if (productId === process.env.NEXT_PUBLIC_STRIPE_FIGO3_PRODUCT_ID) {
//             coupon = (
//               await retrieveCouponForUser({
//                 userId: user.id,
//               })
//             )?.id;
//           }

//           const { client_secret } = await createCheckoutSession({
//             email: user?.email,
//             randevuUserId: user?.id,
//             productId,
//             coupon,
//           });

//           setClientSecret(client_secret);
//         } catch (err) {
//           console.error(err);
//           router.replace("/app/dashboard");
//         }
//       }
//     })();
//   }, [user?.email, user?.id, productId, router]);

//   return (
//     <Box id="checkout">
//       {clientSecret && (
//         <EmbeddedCheckoutProvider
//           stripe={stripePromise}
//           options={{ clientSecret }}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider>
//       )}
//     </Box>
//   );
// }
