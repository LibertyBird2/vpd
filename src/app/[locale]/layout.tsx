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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "VPD — صوت الأشخاص ذوي الإعاقة"
    : "VPD — Voice for Persons with Disabilities";
  const description = isAr
    ? "منظمة حقوقية في اليمن تعمل على تعزيز الحقوق، الكرامة، المشاركة، إمكانية الوصول، والدمج الشامل."
    : "A rights-based organization in Yemen advancing rights, dignity, participation, accessibility and inclusion.";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_YE" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_YE",
      images: [
        {
          url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/307a09e7-6385-40a2-8b61-6f8782ed6007/id-preview-9ce528d4--96c4107a-c601-4567-bd90-41b67a44555e.lovable.app-1784201818766.png",
          width: 1200,
          height: 630,
          alt: "VPD Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/307a09e7-6385-40a2-8b61-6f8782ed6007/id-preview-9ce528d4--96c4107a-c601-4567-bd90-41b67a44555e.lovable.app-1784201818766.png",
      ],
    },
  };
}

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('vpd:a11y');
                var isDark = false;
                if (stored) {
                  var parsed = JSON.parse(stored);
                  if (parsed.appearance === 'dark') isDark = true;
                  else if (parsed.appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) isDark = true;
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  isDark = true;
                }
                if (isDark) document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
