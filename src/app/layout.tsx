import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Montserrat } from "@next/font/google";

import "react-toastify/ReactToastify.min.css";
import { ToasterProvider } from "@/contexts/ToasterContext";
import ToastProvider from "@/components/ToastProvider";
import { CredentialsProvider } from "@/contexts/CredentialsContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"] // You can specify the font weights you want
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"] // Customize as needed
});

export const metadata: Metadata = {
  title: "FOYAA Kanban",
  description: "Created by Fawwaz, Ovie, Yitzhak, Aurore, Abe"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${montserrat.className} h-screen w-screen bg-offWhite px-[4vw] py-[2vw]`}
      >
        <ToasterProvider>
          <CredentialsProvider>
            <ToastProvider />
            {children}
          </CredentialsProvider>
        </ToasterProvider>
      </body>
    </html>
  );
}
