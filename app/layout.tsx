import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { ContentfulWrapper } from "@/lib/cms";
import GoogleTranslateWrapper from "@/lib/polyfill/GoogleTranslateWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Figo Social",
    default: "Figo Social",
  },
  openGraph: {
    locale: "de_DE",
    type: "website",
    url: "https://figosocial.de",
    siteName: "Figo Social",
    images: "/blog-hero.webp",
  },
  metadataBase: new URL("https://figosocial.de"),
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
