import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-ibm-plex",
});

export const viewport: Viewport = {
  themeColor: "#00796B",
};

export const metadata: Metadata = {
  title: "VPD — Voice for Persons with Disabilities",
  description:
    "A rights-based organization in Yemen advancing rights, dignity, participation, accessibility and inclusion.",
  openGraph: {
    title: "VPD — Voice for Persons with Disabilities",
    description:
      "A rights-based organization in Yemen advancing rights, dignity, participation, accessibility and inclusion.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/307a09e7-6385-40a2-8b61-6f8782ed6007/id-preview-9ce528d4--96c4107a-c601-4567-bd90-41b67a44555e.lovable.app-1784201818766.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VPD — Voice for Persons with Disabilities",
    description:
      "A rights-based organization in Yemen advancing rights, dignity, participation, accessibility and inclusion.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/307a09e7-6385-40a2-8b61-6f8782ed6007/id-preview-9ce528d4--96c4107a-c601-4567-bd90-41b67a44555e.lovable.app-1784201818766.png",
    ],
  },
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${locale === "ar" ? ibmPlexSansArabic.variable : inter.variable}`}
    >
      <head>
        <link href="././assets/favicon.png" rel="icon" />
        <link href="././assets/favicon.png" rel="apple-touch-icon"></link>
      </head>
      <body className="antialiased bg-background text-foreground">
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
