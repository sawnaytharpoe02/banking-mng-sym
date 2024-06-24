import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import ClientLayout from "./_components/ClientLayout";

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
        <div className="grid w-full min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <Sidebar />
          </div>
          <div>
            <Topbar />
            <div className="h-[92vh] md:h-[90vh] p-4 md:p-6 overflow-y-auto">
              <ClientLayout>{children}</ClientLayout>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
