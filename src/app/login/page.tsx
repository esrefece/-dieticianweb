'use client';

import { useActionState } from 'react';
import { loginAction } from '@/actions/authActions';

// Form ilk acildiginda hata mesaji bos gelir.
const initialState = { error: '' };

export default function LoginPage() {
  // Server action sonucunu (hata/pending) form ile baglar.
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Diyetisyen Girisi</h1>
        <p className="mt-2 text-sm text-slate-600">Panelinize ulasmak icin giris yapin.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
            />
          </div>

          <div>
            <label htmlFor="sifre" className="mb-1 block text-sm font-medium text-slate-700">
              Sifre
            </label>
            <input
              id="sifre"
              name="sifre"
              type="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
            />
          </div>

          {/* Giris basarisizsa action'dan gelen hata mesaji gosterilir. */}
          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {/* Istek surerken buton metni degisir ve buton devre disi kalir. */}
            {pending ? 'Giris yapiliyor...' : 'Giris Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
