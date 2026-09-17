'use client';

import { useState } from 'react';

export default function WaistHipCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ ratio: number; risk: string; description: string; tone: string } | null>(null);

  const handleCalculate = () => {
    const waistValue = Number(waist);
    const hipValue = Number(hip);

    if (!waistValue || !hipValue || waistValue <= 0 || hipValue <= 0) {
      setResult({
        ratio: 0,
        risk: 'Geçersiz giriş',
        description: 'Bel ve kalça değerleri pozitif olmalıdır.',
        tone: 'border-red-200 bg-red-50 text-red-700',
      });
      return;
    }

    const ratio = waistValue / hipValue;
    const threshold = gender === 'male' ? 0.9 : 0.85;
    const highRisk = ratio >= threshold;

    setResult({
      ratio: Number(ratio.toFixed(2)),
      risk: highRisk ? 'Yüksek risk' : 'Düşük/orta risk',
      description: highRisk
        ? 'Bel/kalça oranı kardiyovasküler risk açısından yükselmiş durumda.'
        : 'Bel/kalça oranı genel olarak daha güvenli bir aralıkta.',
      tone: highRisk ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
    });
  };

  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-xl shadow-rose-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">Bel/Kalça Oranı</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Waist-Hip</h3>
        </div>
        <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Risk</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Cinsiyet</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'male' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Erkek
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'female' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Kadın
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="waist" className="mb-2 block text-sm font-medium text-slate-700">Bel (cm)</label>
          <input
            id="waist"
            type="number"
            min="1"
            value={waist}
            onChange={(event) => setWaist(event.target.value)}
            placeholder="82"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="hip" className="mb-2 block text-sm font-medium text-slate-700">Kalça (cm)</label>
          <input
            id="hip"
            type="number"
            min="1"
            value={hip}
            onChange={(event) => setHip(event.target.value)}
            placeholder="100"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-rose-200 transition hover:scale-[1.01] hover:shadow-xl"
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
