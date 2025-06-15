import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
      <p className="text-xl">
        The page you are looking for might have been removed, had its name changed, or
        is temporarily unavailable.
      </p>
      <Link href="/">
        <a className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md">
          Go back to home page
        </a>
      </Link>
    </main>
  );
}
