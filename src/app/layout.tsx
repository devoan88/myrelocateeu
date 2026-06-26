import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | RelocateEU",
      default: DEFAULT_TITLE,
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',t==='light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full font-sans`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LanguageProvider>
          <Navbar />
          <main className="page-enter flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <CookieConsentBanner />
        <GoogleAnalytics />
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
