import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { portfolio } from "@/content/portfolio";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const { meta, person } = portfolio;

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.title,
  description: meta.description,
  authors: [{ name: `${person.firstName} ${person.lastName}` }],
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: build-cursors.js adds a class to <html> before React loads (reduced motion).
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Plain blocking tags on purpose. In Next 16 the App Router queues strategy="beforeInteractive" scripts and
            injects them after first paint, so the page would flash visible before the script hides it. */}
        {/* Settings, then the script. Edit settings in public/build-cursors.config.js. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- must run before the body renders */}
        <script src="/build-cursors.config.js" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- must run before the body renders */}
        <script src="/build-cursors.js" />
      </head>
      <body className="bg-ink font-sans text-paper antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
