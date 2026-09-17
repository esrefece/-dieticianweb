'use client';

import { useState } from 'react';

export default function CaffeineCalculator() {
  const [tea, setTea] = useState('');
  const [coffee, setCoffee] = useState('');
  const [pregnant, setPregnant] = useState(false);
  const [result, setResult] = useState<{ total: number; limit: number; status: string; note: string } | null>(null);

  const handleCalculate = () => {
    const teaValue = Number(tea);
    const coffeeValue = Number(coffee);

    const total = teaValue * 40 + coffeeValue * 95;
    const limit = pregnant ? 200 : 400;
    const status = total > limit ? 'Limit aşıldı' : 'Güvenli aralık';

    setResult({
      total: Number(total.toFixed(0)),
      limit,
      status,
      note: total > limit
        ? 'Günlük kafein limiti aşıldı; daha düşük bir tüketim tercih edebilirsiniz.'
        : 'Günlük kafein alımınız önerilen sınır içinde.',
    });
  };

  return (
    <div className="rounded-3xl border border-yellow-100 bg-white p-5 shadow-xl shadow-yellow-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-yellow-600">Kafein</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Kafein Takibi</h3>
        </div>
        <div className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">Limit</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="caffeine-tea" className="mb-2 block text-sm font-medium text-slate-700">Çay adedi</label>
          <input
            id="caffeine-tea"
            type="number"
            min="0"
            value={tea}
            onChange={(event) => setTea(event.target.value)}
            placeholder="3"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-yellow-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="caffeine-coffee" className="mb-2 block text-sm font-medium text-slate-700">Kahve adedi</label>
          <input
            id="caffeine-coffee"
            type="number"
            min="0"
            value={coffee}
            onChange={(event) => setCoffee(event.target.value)}
            placeholder="2"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-yellow-400 focus:bg-white"
          />
        </div>
      </div>

      <label className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={pregnant}
          onChange={(event) => setPregnant(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-400"
        />
        Gebelik dönemi / düşük kafein hedefi
      </label>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-yellow-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className={`mt-6 rounded-2xl border p-5 ${result.status === 'Limit aşıldı' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Toplam kafein</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">{result.total}</span>
            <span className="pb-1 text-sm font-medium">mg</span>
          </div>
          <h4 className="mt-3 text-xl font-bold">{result.status}</h4>
          <p className="mt-2 text-sm leading-6 opacity-90">Günlük limit: {result.limit} mg</p>
          <p className="mt-2 text-sm leading-6 opacity-90">{result.note}</p>
        </div>
      )}
    </div>
  );
}
