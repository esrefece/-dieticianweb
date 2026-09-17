'use client';

import { useState } from 'react';

export default function BmrCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmr: number; note: string } | null>(null);

  const handleCalculate = () => {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (!ageValue || !heightValue || !weightValue || ageValue <= 0 || heightValue <= 0 || weightValue <= 0) {
      setResult({
        bmr: 0,
        note: 'Lütfen yaş, boy ve kilo alanlarını doğru girin.',
      });
      return;
    }

    const formula =
      gender === 'male'
        ? 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5
        : 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;

    setResult({
      bmr: Number(formula.toFixed(0)),
      note:
        gender === 'male'
          ? 'Mifflin-St Jeor erkek formülü kullanılarak hesaplanmıştır.'
          : 'Mifflin-St Jeor kadın formülü kullanılarak hesaplanmıştır.',
    });
  };

  return (
    <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-600">Bazal Metabolizma</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">BMR Hesaplayıcı</h3>
        </div>
        <div className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">Mifflin</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Cinsiyet</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'male'
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Erkek
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'female'
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Kadın
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="bmr-age" className="mb-2 block text-sm font-medium text-slate-700">Yaş</label>
          <input
            id="bmr-age"
            type="number"
            min="1"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="30"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="bmr-height" className="mb-2 block text-sm font-medium text-slate-700">Boy (cm)</label>
          <input
            id="bmr-height"
            type="number"
            min="1"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="170"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bmr-weight" className="mb-2 block text-sm font-medium text-slate-700">Kilo (kg)</label>
          <input
            id="bmr-weight"
            type="number"
            min="1"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="68"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-cyan-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Günlük bazal enerji</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">{result.bmr}</span>
            <span className="pb-1 text-sm font-medium">kcal/gün</span>
          </div>
          <p className="mt-3 text-sm leading-6">{result.note}</p>
        </div>
      )}
    </div>
  );
}
