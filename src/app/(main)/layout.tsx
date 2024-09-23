import { SessionProvider } from 'next-auth/react';

import { Footer } from '~/components/footer';
import { MainNav } from '~/components/main-nav';

const navLinks = [
  {
    title: 'Features',
    href: '#',
    disabled: true,
  },
  {
    title: 'Pricing',
    href: '/pricing',
    disabled: false,
  },
  {
    title: 'Blog',
    href: '/blog',
    disabled: false,
  },
  {
    title: 'Documentation',
    href: '/docs',
    disabled: false,
  },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed left-0 right-0 top-0 z-40 border-b bg-background/60 backdrop-blur-md">
        <SessionProvider>
          <div className="container flex h-20 items-center justify-between py-6">
            <MainNav items={navLinks} />
          </div>
        </SessionProvider>
      </header>
      <main className="flex flex-1 flex-col pt-20">{children}</main>
      <Footer />
    </div>
  );
}
