import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';
import GetThemeSite from "@comp_global/GetThemeSite";
import AuthProvider from "@/components/auth/AuthProvider";
import SplashScreen from "@/components/global/SplashScreen/SplashScreen";
import ContentScreen from "@/components/global/SplashScreen/ContentScreen";

type RootLayoutParams = {
  children: Readonly<React.ReactNode>;
};

export default function RootLayout({ children }: RootLayoutParams) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>پنل مدیریتی آرشاپ</title>
        <meta name="description" content="This is the main page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="/fonts/Lalezar/Lalezar-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IRANSans/IRANSansWeb.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/icons/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <script src="/sw-register.js" />
      </head>

      <body cz-shortcut-listen="false">
        <GetThemeSite />
        <SplashScreen>
          <ContentScreen />
        </SplashScreen>
        <Toaster />
        <AuthProvider />
        {children}
      </body>
    </html>
  );
}