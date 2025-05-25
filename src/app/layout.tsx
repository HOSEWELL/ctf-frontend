import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CTF Judge Portal",
  description: "Judge, Score & Track Participants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-800 min-h-screen flex flex-col`}>
        <main >{children}</main>
      </body>
    </html>
  );
}
