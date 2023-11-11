import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import './globals.css';
import { Footer, GoogleAnalytics, Navbar } from '@/components';
import { ModalProvider, ToastProvider } from '@/providers';
// import Navbar from '@/components/navbar';
// import Footer from '@/components/footer';

const font = Urbanist({ subsets: ['latin'] });

// export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Fashion Store',
  description: 'The Fashionable Clothing Store',
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
        <GoogleAnalytics measurementId={`${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
