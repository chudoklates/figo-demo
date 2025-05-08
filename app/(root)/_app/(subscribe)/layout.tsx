// "use client";

// import React from "react";
// import Box from "@mui/material/Box";
// import { ProductType, ProductContext } from "@/lib/context/ProductContext";
// import Stripe from "stripe";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [type, setType] = React.useState<ProductType>("recurring");
//   const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
//   const [coupon, setCoupon] = React.useState<Stripe.Coupon | null>(null);

//   return (
//     <Box minHeight="80vh" pt={{ xs: "calc(10vh + 25px)", lg: "20vh" }}>
//       <ProductContext.Provider
//         value={{
//           type,
//           setType,
//           selectedPlan,
//           setSelectedPlan,
//           coupon,
//           setCoupon,
//         }}
//       >
//         {children}
//       </ProductContext.Provider>
//     </Box>
//   );
// }
