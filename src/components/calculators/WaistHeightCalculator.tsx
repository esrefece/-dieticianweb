'use client';

import { useState } from 'react';

export default function WaistHeightCalculator() {
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ ratio: number; risk: string; description: string; tone: string } | null>(null);

  const handleCalculate = () => {
    const waistValue = Number(waist);
    const heightValue = Number(height);

    if (!waistValue || !heightValue || waistValue <= 0 || heightValue <= 0) {
      setResult({
        ratio: 0,
        risk: 'Geçersiz giriş',
        description: 'Bel ve boy değerleri pozitif olmalıdır.',
        tone: 'border-red-200 bg-red-50 text-red-700',
      });
      return;
    }

    const ratio = waistValue / heightValue;
    const highRisk = ratio > 0.5;

    setResult({
      ratio: Number(ratio.toFixed(2)),
      risk: highRisk ? 'Yüksek risk' : 'Düşük/orta risk',
      description: highRisk
        ? 'Bel/boy oranı iç organ yağlanma riski açısından dikkat gerektiriyor.'
        : 'Bel/boy oranı daha güvenli bir aralıkta görünüyor.',
      tone: highRisk ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
    });
  };

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-600">Bel/Boy Oranı</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Waist-Height</h3>
        </div>
        <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">Risiko</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="waist-height-waist" className="mb-2 block text-sm font-medium text-slate-700">Bel (cm)</label>
          <input
            id="waist-height-waist"
            type="number"
            min="1"
            value={waist}
            onChange={(event) => setWaist(event.target.value)}
            placeholder="82"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="waist-height-height" className="mb-2 block text-sm font-medium text-slate-700">Boy (cm)</label>
          <input
            id="waist-height-height"
            type="number"
            min="1"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="170"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className={`mt-6 rounded-2xl border p-5 ${result.tone}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Sonuç</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">{result.ratio}</span>
          </div>
          <h4 className="mt-3 text-xl font-bold">{result.risk}</h4>
          <p className="mt-2 text-sm leading-6 opacity-90">{result.description}</p>
        </div>
      )}
    </div>
  );
}
