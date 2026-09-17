import Link from 'next/link';
import BmiCalculator from './BmiCalculator';
import BmrCalculator from './BmrCalculator';
import WaterCalculator from './WaterCalculator';

export default function FeaturedCalculators() {
  const calculators = [
    { name: 'BMI', component: BmiCalculator },
    { name: 'BMR', component: BmrCalculator },
    { name: 'Su', component: WaterCalculator },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Popüler Altyapı</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">En Çok Kullanılan Araçlar</h2>
        </div>
        <Link
          href="/hesaplayicilar"
          className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          Tüm Hesaplama Araçları -&gt;
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {calculators.map(({ name, component: Component }) => (
          <div key={name} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-100/60">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {name}
              </span>
            </div>
            <Component />
          </div>
        ))}
      </div>
    </section>
  );
}
