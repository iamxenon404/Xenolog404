import type { Metadata } from "next";
import { Providers } from "./providers"; 
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenlog404 - Webhook Tester",
  description: "Lightning fast webhook inspector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* All app pages and dashboards now have access to the session context */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}