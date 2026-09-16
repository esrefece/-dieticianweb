import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-slate-900">Diyetisyen Web</h1>
        <p className="mt-3 text-slate-600">
          Sistem hazir. Devam etmek icin giris sayfasina gidebilirsiniz.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
        >
          Giris Sayfasina Git
        </Link>
      </div>
    </main>
  );
}