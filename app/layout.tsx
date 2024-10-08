import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/Modals/Modal";
import RegisterModal from "@/components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToastProvider";
import LoginModal from "@/components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/Modals/RentModal";
import SearchModal from "@/components/Modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModal />
        <SearchModal />

        <RentModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}
