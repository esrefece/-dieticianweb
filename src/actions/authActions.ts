'use server';

// Bu dosya login ve logout işlemleri için server action'ları içerir.
// loginAction: E-posta ve şifre ile giriş yapar, başarılı olursa oturum açar.
// logoutAction: Oturumu kapatır ve login sayfasına yönlendirir.
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/auth';
import { db } from '@/lib/db';

type LoginState = {
  error: string;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  // Formdan gelen alanlari aliriz.
  const email = formData.get('email');
  const sifre = formData.get('sifre');

  // Beklenen tipte veri yoksa kullaniciya hata dondurulur.
  if (typeof email !== 'string' || typeof sifre !== 'string') {
    return { error: 'Lutfen gecerli bilgiler girin.' };
  }

  // Veritabanindaki tekil diyetisyen kaydini e-posta ile buluruz.
  const diyetisyen = await db.diyetisyen.findUnique({
    where: { email },
  });

  if (!diyetisyen) {
    return { error: 'E-posta veya sifre hatali.' };
  }

  // Girilen sifreyi hash'li sifre ile karsilastiririz.
  const isValid = await bcrypt.compare(sifre, diyetisyen.sifre);

  if (!isValid) {
    return { error: 'E-posta veya sifre hatali.' };
  }

  // Kimlik dogrulanirsa oturum acilir ve ana sayfaya yonlendirilir.
  await createSession(diyetisyen.id);
  redirect('/');
}

export async function logoutAction() {
  // Oturumu sonlandirip login sayfasina doneriz.
  await deleteSession();
  redirect('/login');
}
