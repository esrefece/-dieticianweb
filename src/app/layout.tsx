// Bu dosya tüm uygulamanın kök layout'udur.
// Her sayfada görünecek olan Navbar ve Footer bileşenlerini içerir ve genel sayfa yapısını tanımlar.
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Uzman Diyetisyen',
  description: 'Kişiye özel beslenme programları ve uzman danışmanlık hizmetleri',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}