import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "src/providers/SmoothScrollProvider";
import CustomCursorProvider from "src/providers/CustomCursorProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio 96 | Luxury Cinematic Photography",
  description:
    "Immersive storytelling and luxury photography for weddings, birthdays, outdoor adventures, and timeless memories.",
  keywords: [
    "Luxury Photography",
    "Cinematic Wedding Photography",
    "Studio 96",
    "Timeless Portraiture",
    "Fine Art Photography",
  ],
  authors: [{ name: "Studio 96" }],
  openGraph: {
    title: "Studio 96 | Luxury Cinematic Photography",
    description: "Capturing moments beyond time. Experiential fine art photography.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body className="bg-matte-black text-cream selection:bg-gold selection:text-matte-black min-h-screen">
        <SmoothScrollProvider>
          <CustomCursorProvider>
            {/* Film Grain Effect */}
            <div className="film-grain" aria-hidden="true" />
            
            {/* Main content */}
            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
          </CustomCursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
