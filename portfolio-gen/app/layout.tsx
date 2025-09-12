import './globals.css'
import { Inter } from 'next/font/google'
import { PortfolioConfig } from '@/components/models/PortfolioConfig';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio Generator',
  description: 'AI-powered portfolio generator with live preview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}