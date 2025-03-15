import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Athena",
  description: "A donation app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Add the favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`flex flex-col min-h-screen mx-auto max-w-[98%] sm:max-w-[94%]`}
        style={{
          fontFamily: "Inter",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
