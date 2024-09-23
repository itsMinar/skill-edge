import Link from 'next/link';

import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="bg-gray-200 py-4 md:py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
          <span className="sr-only">SkillEdge</span>
        </Link>
        <a href="https://github.com/itsMinar" target="_blank">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
            Developed by Minar
          </div>
        </a>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SkillEdge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
