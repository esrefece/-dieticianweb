import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diyetisyen Paneli',
  description: 'Basit giris cikis sistemine sahip admin paneli',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}