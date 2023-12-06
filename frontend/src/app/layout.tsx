import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { GeistSans } from "geist/font/sans";
import Nav from "@/modules/navbar";

export const metadata: Metadata = {
  title: "Wake The F* Up",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="dark min-h-screen h-max text-foreground bg-background">
        <Providers>
          <Nav />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
