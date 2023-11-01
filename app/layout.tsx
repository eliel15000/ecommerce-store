import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import './globals.css';
import { Footer, Navbar } from '@/components';
import { ModalProvider, ToastProvider } from '@/providers';
// import Navbar from '@/components/navbar';
// import Footer from '@/components/footer';

const font = Urbanist({ subsets: ['latin'] });

// export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Audio Store',
  description: 'Audio Equipment Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
