import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-enter flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 font-sans text-[28px] font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-sans text-base text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-5 py-2.5 font-sans text-sm font-medium text-primary-foreground no-underline transition-colors duration-150 hover:opacity-90"
      >
        Back to homepage
      </Link>
    </main>
  );
}
