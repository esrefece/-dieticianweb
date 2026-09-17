'use client';

import { useState } from 'react';

export default function TdeeCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.375');
  const [result, setResult] = useState<{ tdee: number; bmr: number; note: string } | null>(null);

  const handleCalculate = () => {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);
    const activityValue = Number(activity);

    if (!ageValue || !heightValue || !weightValue || ageValue <= 0 || heightValue <= 0 || weightValue <= 0 || !activityValue) {
      setResult({
        tdee: 0,
        bmr: 0,
        note: 'Lütfen tüm alanları doğru bir şekilde doldurun.',
      });
      return;
    }

    const bmr =
      gender === 'male'
        ? 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5
        : 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;

    const tdee = bmr * activityValue;

    setResult({
      tdee: Number(tdee.toFixed(0)),
      bmr: Number(bmr.toFixed(0)),
      note: `Aktivite katsayısı ${activityValue.toFixed(3)} ile hesaplandı.`,
    });
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Toplam Enerji</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">TDEE Hesaplayıcı</h3>
        </div>
        <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Aktivite</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Cinsiyet</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'male' ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Erkek
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                gender === 'female' ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              Kadın
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="tdee-age" className="mb-2 block text-sm font-medium text-slate-700">Yaş</label>
          <input
            id="tdee-age"
            type="number"
            min="1"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="30"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="tdee-height" className="mb-2 block text-sm font-medium text-slate-700">Boy (cm)</label>
          <input
            id="tdee-height"
            type="number"
            min="1"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="170"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="tdee-weight" className="mb-2 block text-sm font-medium text-slate-700">Kilo (kg)</label>
          <input
            id="tdee-weight"
            type="number"
            min="1"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="68"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="tdee-activity" className="mb-2 block text-sm font-medium text-slate-700">Aktivite Katsayısı</label>
          <select
            id="tdee-activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white"
          >
            <option value="1.2">1.2 - Minimal aktivite</option>
            <option value="1.375">1.375 - Hafif aktivite</option>
            <option value="1.55">1.55 - Orta aktivite</option>
            <option value="1.725">1.725 - Yüksek aktivite</option>
            <option value="1.9">1.9 - Çok yüksek aktivite</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-violet-800">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Toplam günlük kalori</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">{result.tdee}</span>
            <span className="pb-1 text-sm font-medium">kcal/gün</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/50 px-3 py-2 text-sm">
            <span>BMR</span>
            <span className="font-semibold">{result.bmr} kcal</span>
          </div>
          <p className="mt-3 text-sm leading-6">{result.note}</p>
        </div>
      )}
    </div>
  );
}
