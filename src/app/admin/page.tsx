import { logoutAction } from '@/actions/authActions';

export default function AdminPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Basarili giristen sonra gorunen korumali alan karti. */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h1 className="text-2xl font-semibold text-emerald-800">Giris Basarili</h1>
          <p className="mt-2 text-sm text-emerald-700">
            Diyetisyen panelinize hos geldiniz. Araclar bu alanda yer alacak.
          </p>
        </div>

        {/* Bu form gonderildiginde server action ile cikis yapilir. */}
        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
          >
            Cikis Yap
          </button>
        </form>
      </div>
    </main>
  );
}
