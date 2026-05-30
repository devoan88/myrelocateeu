import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-700"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            R
          </span>
          RelocateEU
        </Link>
        <button
          type="button"
          className="rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          Login
        </button>
      </div>
    </nav>
  );
}
