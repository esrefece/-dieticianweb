'use client';

import { useState } from 'react';

export default function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{
    bmi: number;
    label: string;
    description: string;
    tone: string;
  } | null>(null);

  const handleCalculate = () => {
    const kg = Number(weight);
    const cm = Number(height);

    if (!kg || !cm || kg <= 0 || cm <= 0) {
      setResult({
        bmi: 0,
        label: 'Geçersiz giriş',
        description: 'Kilo ve boy değerleri pozitif olmalıdır.',
        tone: 'border-red-200 bg-red-50 text-red-700',
      });
      return;
    }

    const bmi = kg / ((cm / 100) ** 2);
    let label = '';
    let description = '';
    let tone = 'border-sky-200 bg-sky-50 text-sky-700';

    if (bmi < 18.5) {
      label = 'Zayıf';
      description = 'Kilo alımına odaklanarak dengeli bir beslenme planı oluşturabilirsiniz.';
      tone = 'border-sky-200 bg-sky-50 text-sky-700';
    } else if (bmi < 25) {
      label = 'Normal';
      description = 'Sağlıklı kilo aralığındasınız. Mevcut beslenmenizi koruyun.';
      tone = 'border-emerald-200 bg-emerald-50 text-emerald-700';
    } else if (bmi < 30) {
      label = 'Fazla Kilolu';
      description = 'Kilo kontrolü için düzenli fiziksel aktivite ve porsiyon kontrolü önerilir.';
      tone = 'border-amber-200 bg-amber-50 text-amber-700';
    } else {
      label = 'Obez';
      description = 'Sağlık risklerini azaltmak için profesyonel destekle hedef kilo yönetimi önerilir.';
      tone = 'border-rose-200 bg-rose-50 text-rose-700';
    }

    setResult({
      bmi: Number(bmi.toFixed(1)),
      label,
      description,
      tone,
    });
  };

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-100/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Vücut Kitle İndeksi</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">BMI Hesaplayıcı</h3>
        </div>
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">DSÖ</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="bmi-weight" className="mb-2 block text-sm font-medium text-slate-700">Kilo (kg)</label>
          <input
            id="bmi-weight"
            type="number"
            min="0"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="60"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="bmi-height" className="mb-2 block text-sm font-medium text-slate-700">Boy (cm)</label>
          <input
            id="bmi-height"
            type="number"
            min="0"
            step="0.1"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="170"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.01] hover:shadow-xl"
      >
        Hesapla
      </button>

      {result && (
        <div className={`mt-6 rounded-2xl border p-5 ${result.tone}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Sonuç</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">{result.bmi}</span>
            <span className="pb-1 text-sm font-medium">kg/m²</span>
          </div>
          <h4 className="mt-3 text-xl font-bold">{result.label}</h4>
          <p className="mt-2 text-sm leading-6 opacity-90">{result.description}</p>
        </div>
      )}
    </div>
  );
}
