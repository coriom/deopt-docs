import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DocsShell } from "@/components/DocsShell";

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--app-font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--app-font-mono",
});

export const metadata: Metadata = {
  title: "DeOpt Docs",
  description:
    "Documentation for DeOpt's public HTTP API, WebSocket streams, wallet-authenticated account data, signed intents, and operator-whitelisted MM gateway.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-black text-zinc-200 antialiased">
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  );
}
