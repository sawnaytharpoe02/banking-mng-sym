import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: "%s | Bank Inc",
    default: "Bank Inc",
  },
  description: "The mini banking management system built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark", GeistSans.className)}>
      <body
        className={cn("bg-background font-sans antialiased overflow-hidden")}>
        {children}
        <NextTopLoader color="#AEAEAE" showSpinner={false} />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
