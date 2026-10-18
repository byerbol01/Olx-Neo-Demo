import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import LiveSupportChat from "@/components/LiveSupportChat";

export const metadata = {
  metadataBase: new URL("https://olx-neo.uz"),
  title: {
    default: "OLX Neo — O'zbekiston bo'ylab 3 milliondan ortiq e'lonlar",
    template: "%s | OLX Neo O'zbekiston",
  },
  description:
    "O'zbekistondagi eng yirik zamonaviy e'lonlar va savdo maydonchasi. Avtomobillar, ko'chmas mulk, elektronika, noutbuklar, telefonlar va xizmatlar. Qulay, tez va xavfsiz.",
  keywords: [
    "olx uzbekistan",
    "olx neo",
    "elonlar toshkent",
    "noutbuklar toshkent",
    "macbook pro toshkent",
    "mashina sotib olish",
    "uy sotib olish toshkent",
    "ish o'rinlari uzbekiston",
    "iphone toshkent",
    "kvartira toshkent",
  ],
  authors: [{ name: "OLX Neo Uzbekistan" }],
  creator: "OLX Neo",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://olx-neo.uz",
    siteName: "OLX Neo O'zbekiston",
    title: "OLX Neo — O'zbekiston bo'ylab 3 milliondan ortiq e'lonlar",
    description:
      "O'zbekistondagi eng yirik zamonaviy savdo maydonchasi. Qulay, tez va xavfsiz xarid.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "OLX Neo Savdo Maydonchasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OLX Neo — O'zbekiston savdo maydonchasi",
    description: "Kerakli narsani osongina toping, soting yoki xarid qiling.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#002f34",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col bg-[#f4f6f7] text-[#002f34] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
        <LiveSupportChat />
      </body>
    </html>
  );
}
