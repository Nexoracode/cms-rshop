import "../styles/globals.css";
import { Providers } from "./providers";
import { DarkMode } from "@/components/DarkMode";

export const metadata = {
  title: "پنل مدیریتی آرشاپ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <head />
      <body cz-shortcut-listen="false" className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Providers>
          <header className="p-4 flex justify-end">
            <DarkMode />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
