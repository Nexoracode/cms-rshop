"use client"

import "../styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
