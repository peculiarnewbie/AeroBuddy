import { Inter } from 'next/font/google';

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

    return (
        <div style={{marginTop:'100px'}}>
            {children}
        </div>
      )
    }
    