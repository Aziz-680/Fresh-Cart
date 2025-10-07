import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import Providers from "../Providers";

import { Toaster } from "sonner";






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fresh Cart",
  description: "From shops to your heart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black cstthm bg-slate-100 dark:bg-slate-800`}
      >

        <Providers>

          <Navbar />

          {children}

        <Footer />

        </Providers>
        
        <Toaster />
      </body>
    </html>
  );
}
