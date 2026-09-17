// Bu dosya JWT tabanlı oturum yönetimi için kullanılır.
// Oturum oluşturma (createSession), oturum doğrulama (verifySession) ve oturum silme (deleteSession) fonksiyonlarını içerir.
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

// Oturum bilgisini tarayicida tutacagimiz cookie anahtari.
const SESSION_COOKIE_NAME = 'session';
// JWT imzalama ve dogrulama icin .env dosyasindaki gizli anahtar kullanilir.
const SECRET_KEY = process.env.AUTH_SECRET;

if (!SECRET_KEY) {
  throw new Error('AUTH_SECRET tanimlanmamis.');
}

const secret = new TextEncoder().encode(SECRET_KEY);

export async function createSession(userId: string) {
  // Oturum suresi: 7 gun.
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Sadece kullanici kimligi tasiyan, HS256 ile imzalanmis JWT uretilir.
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies();
  // JWT'yi guvenli cookie olarak kaydederiz.
  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  // Cookie yoksa aktif oturum yoktur.
  if (!token) {
    return null;
  }

  try {
    // Token imzasi ve suresi kontrol edilir.
    const payload = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    return payload.payload;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  // Oturum cookie'sini silerek cikis yapilir.
  cookieStore.delete(SESSION_COOKIE_NAME);
}
