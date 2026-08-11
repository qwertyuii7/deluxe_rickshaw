import type { Metadata } from "next";
import { Yatra_One, Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-yatra-one",
});

const baloo2 = Baloo_2({
  subsets: ["latin", "devanagari"],
  variable: "--font-baloo-2",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ऑटो रिक्शा FM — 100% देसी Vibes",
  description: "देसी vibes, zero AC. The ultimate auto rickshaw music playlist experience. सवारी चालू है!",
  keywords: ["auto rickshaw", "desi playlist", "hindi songs", "truck driver music", "indian meme"],
  openGraph: {
    title: "ऑटो रिक्शा FM",
    description: "100% देसी Vibes · Zero AC · सवारी चालू है!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${yatraOne.variable} ${baloo2.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-off-black text-rickshaw-yellow font-inter">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
