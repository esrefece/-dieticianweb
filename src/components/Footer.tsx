// Bu component sitenin alt kısmında (footer) görünen iletişim bilgilerini ve copyright bilgisini gösterir.
// Diyetisyen bilgilerini veritabanından çeker ve modern bir tasarımla kullanıcıya sunar.
import { Phone, MapPin, Mail, Heart, Calendar } from 'lucide-react';
import { db } from '@/lib/db';

export default async function Footer() {
  const diyetisyen = await db.diyetisyen.findFirst();

  return (
    <footer className="border-t border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  Uzman Diyetisyen
                </h3>
                 <p className="text-sm text-emerald-600">{diyetisyen?.unvan || 'Admin'}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {diyetisyen?.biyo || 'Sağlıklı yaşam yolculuğunuzda size rehberlik etmek için buradayız. Kişiye özel beslenme programları ve uzman danışmanlık hizmetleri sunuyoruz.'}
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
              <span className="h-8 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-3"></span>
              İletişim Bilgileri
            </h3>
            <ul className="space-y-4">
              {diyetisyen?.telefon && (
                <li className="flex items-start group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors mr-3 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Telefon</p>
                    <a href={`tel:${diyetisyen.telefon}`} className="text-slate-700 font-medium hover:text-emerald-600 transition-colors">
                      {diyetisyen.telefon}
                    </a>
                  </div>
                </li>
              )}
              {diyetisyen?.email && (
                <li className="flex items-start group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors mr-3 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">E-posta</p>
                    <a href={`mailto:${diyetisyen.email}`} className="text-slate-700 font-medium hover:text-emerald-600 transition-colors">
                      {diyetisyen.email}
                    </a>
                  </div>
                </li>
              )}
              {diyetisyen?.adres && (
                <li className="flex items-start group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors mr-3 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Adres</p>
                    <p className="text-slate-700 font-medium">{diyetisyen.adres}</p>
                  </div>
                </li>
              )}
              {diyetisyen?.instagram && (
                <li className="flex items-start group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors mr-3 flex-shrink-0">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Instagram</p>
                    <a href={`https://instagram.com/${diyetisyen.instagram.replace('@', '')}`} className="text-slate-700 font-medium hover:text-emerald-600 transition-colors">
                      {diyetisyen.instagram}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex flex-col justify-center">
            <div className="pt-6 border-t border-emerald-200">
              <p className="text-slate-600 flex items-center">
                © {new Date().getFullYear()} {diyetisyen?.adSoyad || 'Admin'}
              </p>
              <p className="text-sm text-slate-500 mt-2 flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1 fill-red-500" /> for healthy living
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
