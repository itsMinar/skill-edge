import Link from 'next/link';

import { Button } from '~/components/ui/button';

export default function RootNotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4 text-gray-100">
      <div className="text-center">
        <h1 className="mb-2 bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent lg:text-7xl">
          404
        </h1>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-indigo-200 lg:text-3xl">
          Oops! Page not found
        </h2>
      </div>
      <div className="mb-8">
        <svg
          className="mx-auto h-64 w-64 text-indigo-300"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="20"
          />
          <path
            d="M60 120C60 120 80 150 100 150C120 150 140 120 140 120"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <circle cx="60" cy="80" r="10" fill="currentColor" />
          <circle cx="140" cy="80" r="10" fill="currentColor" />
        </svg>
      </div>
      <p className="mb-8 max-w-[500px] px-4 text-center text-lg text-indigo-200">
        We&apos;re sorry, but it seems you&apos;ve wandered into uncharted
        territory. Let&apos;s get you back on track!
      </p>
      <Button
        asChild
        className="bg-indigo-500 text-white transition-colors duration-200 hover:bg-indigo-600"
      >
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
