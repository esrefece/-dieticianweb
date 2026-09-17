// Bu sayfa sitenin ana sayfasıdır (homepage).
// Hero bölümü, hesaplama araçları ve "Neden Biz?" özelliklerini içerir.
// Modern diyetisyen temasıyla tasarlanmıştır ve responsive'dir.
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import FeaturedCalculators from '@/components/calculators/FeaturedCalculators';
import { Apple, TrendingUp, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="space-y-24 px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Profesyonel Beslenme Danışmanlığı
            </Badge>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">
              Sağlıklı Yaşam Yolculuğunuzda
              <span className="block mt-2 text-emerald-100">Size Rehberlik Ediyoruz</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-emerald-100 leading-relaxed">
              Kişiye özel beslenme programları, uzman danışmanlık ve kanıta dayalı 
              yaklaşımlarla hedeflerinize ulaşmanıza yardımcı oluyoruz.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg">
                Hemen Başlayın
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Hakkımızda
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCalculators />

      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/40 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Tam araç listesi</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Tüm hesaplamaları tek sayfada görün</h2>
            </div>
            <Link href="/hesaplayicilar">
              <Button variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800">
                Tüm Araçları Aç
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Neden Biz?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Size en uygun beslenme programı için bilimsel yaklaşımlar ve kişiselleştirilmiş çözümler sunuyoruz
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-xl transition-all border-emerald-100">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg">
              <Apple className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Kişiye Özel Programlar</h3>
            <p className="text-slate-600">Yaşam tarzınıza, hedeflerinize ve sağlık durumunuza özel beslenme planları</p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-all border-emerald-100">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Sürekli Takip</h3>
            <p className="text-slate-600">İlerlemenizi düzenli olarak takip ediyor ve programınızı güncelliyoruz</p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-all border-emerald-100">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Bilimsel Yaklaşım</h3>
            <p className="text-slate-600">Kanıta dayalı beslenme bilimi ile en güncel bilgileri sunuyoruz</p>
          </Card>
        </div>
      </section>
    </main>
  );
}