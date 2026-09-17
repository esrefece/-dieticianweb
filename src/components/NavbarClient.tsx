'use client';

// Bu component Navbar'ın client-side kısmını yönetir.
// Mobil menü açma/kapama, logout işlemi ve kullanıcı bilgilerinin gösterilmesi gibi interaktif işlemleri burada yapılır.
import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Menu, X, Lock, LogOut, User } from 'lucide-react';
import Button from './ui/Button';
import { logoutAction } from '@/actions/authActions';

interface User {
  id: string;
  email: string;
  ad: string;
  soyad: string;
  unvan: string | null;
  avatarUrl: string | null;
}

interface NavbarClientProps {
  user: User | null;
  isAdmin: boolean;
  profile: {
    ad: string;
    soyad: string;
  } | null;
}

export default function NavbarClient({ user, isAdmin, profile }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullName = `${profile?.ad || 'admin'} ${profile?.soyad || 'admin'}`;

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  Uzman Diyetisyen
                </h3>
                <p className="text-xs text-emerald-600 -mt-1">{fullName}</p>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium"
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/hesaplayicilar" 
                className="px-4 py-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium"
              >
                Hesaplayıcılar
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Login Button / User Info */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <User className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    {fullName}
                  </span>
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center space-x-1 ml-2 px-2 py-1 bg-amber-100 rounded-full border border-amber-300 hover:bg-amber-200 transition-colors cursor-pointer">
                      <Lock className="h-3 w-3 text-amber-700" />
                      <span className="text-xs font-semibold text-amber-800">Admin</span>
                    </Link>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all"
                  title="Çıkış Yap"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                >
                  Giriş Yap
                </Button>
              </Link>
            )}

            {/* Appointment Button */}
            <Button 
              icon={Calendar} 
              iconPosition="right"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <span className="hidden sm:inline">Randevu Al</span>
              <span className="sm:hidden">Randevu</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/hesaplayicilar" 
              className="block px-4 py-3 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hesaplayıcılar
            </Link>
            {user && (
              <div className="px-4 py-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    {fullName}
                  </span>
                </div>
                {isAdmin && (
                  <Link href="/admin" className="flex items-center space-x-2 px-2 py-1 bg-amber-100 rounded-full border border-amber-300 w-fit hover:bg-amber-200 transition-colors cursor-pointer">
                    <Lock className="h-3 w-3 text-amber-700" />
                    <span className="text-xs font-semibold text-amber-800">Admin</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
