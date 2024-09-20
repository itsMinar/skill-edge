import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

import { Toaster } from '~/components/ui/sonner';
import { cn } from '~/lib/utils';
import '~/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'SkillEdge',
  description:
    'SkillEdge offers a diverse range of online courses designed to help you master new skills and advance your career. Learn at your own pace with industry experts, and unlock your full potential today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
        />
      </head>
      <body className={cn(inter.className, poppins.className)}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
