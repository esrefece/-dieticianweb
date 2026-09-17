'use client';

import { useState } from 'react';

export default function WaterCalculator() {
  const [weight, setWeight] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState('');
  const [result, setResult] = useState<{ litres: number; cups: number; note: string } | null>(null);

  const handleCalculate = () => {
    const weightValue = Number(weight);
    const exerciseValue = Number(exerciseMinutes);

    if (!weightValue || weightValue <= 0) {
      setResult({
        litres: 0,
        cups: 0,
        note: 'Lütfen kilo değerini girin.',
      });
      return;
    }

    const litres = weightValue * 0.035 + exerciseValue / 60;
    const cups = litres * 4;

    setResult({
      litres: Number(litres.toFixed(2)),
      cups: Number(cups.toFixed(0)),
      note: 'EFSA yaklaşımı: ağırlık (kg) × 0.035 + egzersiz süresi/60 kullanılarak hesaplanmıştır.',
    });
  };

  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-xl shadow-sky-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Su Tüketimi</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">Su İhtiyacı</h3>
        </div>
        <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">EFSA</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="water-weight" className="mb-2 block text-sm font-medium text-slate-700">Kilo (kg)</label>
          <input
            id="water-weight"
            type="number"
            min="1"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="68"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="water-exercise" className="mb-2 block text-sm font-medium text-slate-700">Egzersiz süresi (dk)</label>
          <input
            id="water-exercise"
            type="number"
            min="0"
            value={exerciseMinutes}
            onChange={(event) => setExerciseMinutes(event.target.value)}
            placeholder="30"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-sky-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sky-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Günlük su ihtiyacı</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Litre</p>
              <p className="mt-1 text-2xl font-bold">{result.litres} L</p>
            </div>
            <div className="rounded-xl bg-white/60 p-3">
              <p className="text-sm opacity-75">Bardak</p>
              <p className="mt-1 text-2xl font-bold">{result.cups}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6">{result.note}</p>
        </div>
      )}
    </div>
  );
}
