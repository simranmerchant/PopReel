import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to PopReel</h1>
      <Link href="/feed" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Go to Feed
      </Link>
    </main>
  );
}