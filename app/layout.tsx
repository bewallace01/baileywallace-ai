import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baileywallace.ai"),
  title: {
    default: "Bailey Wallace",
    template: "%s, Bailey Wallace",
  },
  description:
    "AI operator and photogrammetrist. Co-founder of Lightspace Labs. I build AI systems that see the world from above.",
  openGraph: {
    title: "Bailey Wallace",
    description:
      "AI operator and photogrammetrist. Co-founder of Lightspace Labs.",
    url: "https://baileywallace.ai",
    siteName: "Bailey Wallace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bailey Wallace",
    description:
      "AI operator and photogrammetrist. Co-founder of Lightspace Labs.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/*
          Mark the document as JS-enabled before paint so the scroll-reveal
          CSS only applies when we can actually animate things in. Prevents
          content from being invisible if JS fails or a crawler runs without it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-sans antialiased bg-ink-900 text-paper-100">
        {children}
      </body>
    </html>
  );
}
