import Header from '@/components/header';
import LoadingSplash from '@/components/LoadingSplash';
import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aerobuddy AI',
  description: 'Your AI-Powered Solution for Seamless Decision-Making',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  console.log('session:', session);

  return (
    <html lang="en">
      {/* <Splash></Splash> */}
      <body className={`${inter.className}`}>
        <LoadingSplash></LoadingSplash>
        <Header session={session}></Header>
        {children}
      </body>
    </html>
  )
}
