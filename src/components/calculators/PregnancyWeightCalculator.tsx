'use client';

import { useState } from 'react';

export default function PregnancyWeightCalculator() {
  const [bmi, setBmi] = useState('');
  const [week, setWeek] = useState('');
  const [result, setResult] = useState<{ category: string; totalMin: number; totalMax: number; weekMin: number; weekMax: number; note: string } | null>(null);

  const handleCalculate = () => {
    const bmiValue = Number(bmi);
    const weekValue = Number(week);

    if (!bmiValue || !weekValue || bmiValue <= 0 || weekValue <= 0) {
      setResult({
        category: 'Geçersiz giriş',
        totalMin: 0,
        totalMax: 0,
        weekMin: 0,
        weekMax: 0,
        note: 'Vücut kitle indeksi ve gebelik haftası gerekli alanlardır.',
      });
      return;
    }

    const safeWeek = Math.min(Math.max(weekValue, 1), 40);

    let totalMin = 0;
    let totalMax = 0;
    let weeklyMin = 0;
    let weeklyMax = 0;
    let category = 'Normal';

    if (bmiValue < 18.5) {
      category = 'Düşük VKİ';
      totalMin = 12.5;
      totalMax = 18;
      weeklyMin = 0.44;
      weeklyMax = 0.58;
    } else if (bmiValue < 25) {
      category = 'Normal VKİ';
      totalMin = 11.5;
      totalMax = 16;
      weeklyMin = 0.35;
      weeklyMax = 0.5;
    } else if (bmiValue < 30) {
      category = 'Fazla kilolu';
      totalMin = 7;
      totalMax = 11.5;
      weeklyMin = 0.23;
      weeklyMax = 0.33;
    } else {
      category = 'Obez';
      totalMin = 5;
      totalMax = 9;
      weeklyMin = 0.17;
      weeklyMax = 0.27;
    }

    const weekMin = Number((weeklyMin * safeWeek).toFixed(1));
    const weekMax = Number((weeklyMax * safeWeek).toFixed(1));

    setResult({
      category,
      totalMin: Number(totalMin.toFixed(1)),
      totalMax: Number(totalMax.toFixed(1)),
      weekMin,
      weekMax,
      note: `Haftaya göre hedef kilo artışı yaklaşık ${weekMin} - ${weekMax} kg aralığındadır.`,
    });
  };

  return (
    <div className="rounded-3xl border border-fuchsia-100 bg-white p-5 shadow-xl shadow-fuchsia-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-fuchsia-600">Gebelik</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Kilo Artışı</h3>
        </div>
        <div className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">IOM</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="preg-bmi" className="mb-2 block text-sm font-medium text-slate-700">Gebelik öncesi BMI</label>
          <input
            id="preg-bmi"
            type="number"
            min="1"
            step="0.1"
            value={bmi}
            onChange={(event) => setBmi(event.target.value)}
            placeholder="22.5"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-fuchsia-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="preg-week" className="mb-2 block text-sm font-medium text-slate-700">Gebelik haftası</label>
          <input
            id="preg-week"
            type="number"
            min="1"
            max="40"
            value={week}
            onChange={(event) => setWeek(event.target.value)}
            placeholder="20"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-fuchsia-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 text-fuchsia-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Önerilen artış</p>
          <h4 className="mt-2 text-xl font-bold">{result.category}</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Toplam hedef</p>
              <p className="mt-1 text-2xl font-bold">{result.totalMin} - {result.totalMax} kg</p>
            </div>
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Bu haftaya kadar</p>
              <p className="mt-1 text-2xl font-bold">{result.weekMin} - {result.weekMax} kg</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6">{result.note}</p>
        </div>
      )}
    </div>
  );
}
