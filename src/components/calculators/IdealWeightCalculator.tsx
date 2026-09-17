'use client';

import { useState } from 'react';

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ min: number; max: number; message: string } | null>(null);

  const handleCalculate = () => {
    const heightValue = Number(height);

    if (!heightValue || heightValue <= 0) {
      setResult({
        min: 0,
        max: 0,
        message: 'Lütfen boy değerini doğru girin.',
      });
      return;
    }

    const heightInMeters = heightValue / 100;
    const min = 18.5 * (heightInMeters ** 2);
    const max = 24.9 * (heightInMeters ** 2);

    setResult({
      min: Number(min.toFixed(1)),
      max: Number(max.toFixed(1)),
      message: 'DSÖ 18.5 - 24.9 BMI aralığı dikkate alınarak hedef kilo bandı hesaplanmıştır.',
    });
  };

  return (
    <div className="rounded-3xl border border-teal-100 bg-white p-5 shadow-xl shadow-teal-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-600">İdeal Kilo</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Hedef Kilo Aralığı</h3>
        </div>
        <div className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">DSÖ</div>
      </div>

      <div>
        <label htmlFor="ideal-height" className="mb-2 block text-sm font-medium text-slate-700">Boy (cm)</label>
        <input
          id="ideal-height"
          type="number"
          min="1"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          placeholder="170"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
        />
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-teal-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-teal-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">İdeal kilo hedefi</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Minimum</p>
              <p className="mt-1 text-2xl font-bold">{result.min} kg</p>
            </div>
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Maksimum</p>
              <p className="mt-1 text-2xl font-bold">{result.max} kg</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6">{result.message}</p>
        </div>
      )}
    </div>
  );
}
