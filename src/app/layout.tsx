"use client";

import "../styles/globals.css";
import * as React from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/system";
import { Toaster } from "react-hot-toast";
/* import SplashScreen from "@/components/Helper/SplashScreen"; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  return (
    <html lang="fa">
      <head>
        <link
          rel="preload"
          href="/fonts/IRANSansWeb_Medium.woff"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body cz-shortcut-listen="false">
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider navigate={router.push} locale="fa-IR">
            {/* <SplashScreen /> */}
            <React.Suspense fallback={<p></p>}>{children}</React.Suspense>
          </HeroUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
