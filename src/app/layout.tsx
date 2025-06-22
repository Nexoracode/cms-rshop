import "../styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "پنل مدیریتی آرشاپ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <head />
      <body cz-shortcut-listen="false" className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
