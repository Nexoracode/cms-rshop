import "@styles/globals.css";
import { Toaster } from 'react-hot-toast';
import GetThemeSite from "@comp_global/GetThemeSite";
import AuthProvider from "@/components/auth/modules/AuthProvider";
import SplashScreen from "@/components/global/SplashScreen";

type RootLayoutParams = {
  children: Readonly<React.ReactNode>;
};

export default function RootLayout({ children }: RootLayoutParams) {
  return (
    <html lang="fa" dir="ltr">
      <head>
        <title>پنل مدیریتی آرشاپ</title>
        <meta name="description" content="This is the main page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <script src="/sw-register.js" />
      </head>

      <body cz-shortcut-listen="false">
        <GetThemeSite />
        <SplashScreen />
        <Toaster />
        <AuthProvider />
        {children}
      </body>
    </html>
  );
}