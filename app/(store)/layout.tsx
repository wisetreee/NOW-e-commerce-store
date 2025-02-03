import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";
import Header from "../components/Header";
import Footer from "../components/Footer";

const velaSans = localFont({
  src: [
    { path: "../fonts/VelaSans-Regular.ttf", weight: "400", style: "regular" },
    { path: "../fonts/VelaSans-Medium.ttf", weight: "500", style: "medium" },
    { path: "../fonts/VelaSans-Semibold.ttf", weight: "600", style: "semibold" },
  ],
  variable: "--font-vela-sans",
});

const uncage = localFont({
  src: [
    { path: "../fonts/UNCAGE-Regular.ttf", weight: "400", style: "regular" },
    { path: "../fonts/UNCAGE-Medium.ttf", weight: "500", style: "medium" },
  ],
  variable: "--font-uncage",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body
        className={`${velaSans.variable} ${uncage.variable}  antialiased flex flex-col min-h-[1000px]`}
      >    
        <Header/>
        {children}
        <Footer/>
        
        <SanityLive />
      </body>
    </html>
    </ClerkProvider>
  );
}
