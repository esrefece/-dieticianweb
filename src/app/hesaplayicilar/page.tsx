'use client';

import { useState } from 'react';
import BmiCalculator from '@/components/calculators/BmiCalculator';
import BmrCalculator from '@/components/calculators/BmrCalculator';
import TdeeCalculator from '@/components/calculators/TdeeCalculator';
import IdealWeightCalculator from '@/components/calculators/IdealWeightCalculator';
import WaterCalculator from '@/components/calculators/WaterCalculator';
import WaistHipCalculator from '@/components/calculators/WaistHipCalculator';
import WaistHeightCalculator from '@/components/calculators/WaistHeightCalculator';
import PregnancyWeightCalculator from '@/components/calculators/PregnancyWeightCalculator';
import CaffeineCalculator from '@/components/calculators/CaffeineCalculator';

const toolTabs = [
  { name: 'BMI', component: BmiCalculator },
  { name: 'BMR', component: BmrCalculator },
  { name: 'TDEE', component: TdeeCalculator },
  { name: 'İdeal Kilo', component: IdealWeightCalculator },
  { name: 'Su', component: WaterCalculator },
  { name: 'Bel/Kalça', component: WaistHipCalculator },
  { name: 'Bel/Boy', component: WaistHeightCalculator },
  { name: 'Gebelik', component: PregnancyWeightCalculator },
  { name: 'Kafein', component: CaffeineCalculator },
] as const;

export default function CalculatorsPage() {
  const [activeTool, setActiveTool] = useState<(typeof toolTabs)[number]['name']>('BMI');
  const ActiveComponent = toolTabs.find((tool) => tool.name === activeTool)?.component ?? BmiCalculator;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Sağlık Takibi</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Hesaplama Araçları</h1>
      </div>

      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {toolTabs.map((tool) => {
            const isActive = tool.name === activeTool;

            return (
              <button
                key={tool.name}
                type="button"
                onClick={() => setActiveTool(tool.name)}
                className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition sm:text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tool.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <ActiveComponent />
      </div>
    </main>
  );
}
