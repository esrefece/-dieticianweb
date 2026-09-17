// Bu component sitenin üst navigasyon bar'ını oluşturur.
// Server component olarak çalışır, kullanıcının oturum durumunu kontrol eder ve bu bilgiyi NavbarClient'e geçirir.
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import Button from './ui/Button';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const session = await verifySession();
  let user = null;
  let isAdmin = false;

  if (session) {
    user = await db.diyetisyen.findUnique({
      where: { id: session.userId as string },
      select: {
        id: true,
        email: true,
        adSoyad: true,
        unvan: true,
        avatarUrl: true,
      },
    });
    isAdmin = !!user;
  }

  return <NavbarClient user={user} isAdmin={isAdmin} />;
}
