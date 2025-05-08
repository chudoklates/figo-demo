import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { ContentfulWrapper } from "@/lib/cms";
import GoogleTranslateWrapper from "@/lib/polyfill/GoogleTranslateWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Figo Demo",
    default: "Figo Demo",
  },
  openGraph: {
    locale: "de_DE",
    type: "website",
    url: "https://figo-demo.vercel.app",
    siteName: "Figo Demo",
    images: "/blog-hero.webp",
  },
  metadataBase: new URL("https://figo-demo.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <ThemeRegistry>
        <ContentfulWrapper>
          <GoogleTranslateWrapper>
            <body>{children}</body>
          </GoogleTranslateWrapper>
        </ContentfulWrapper>
      </ThemeRegistry>
    </html>
  );
}
