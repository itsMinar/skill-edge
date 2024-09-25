'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { cn } from '~/lib/utils';
import { NavLink } from '~/types';

import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type MainNavProps = {
  items: NavLink[];
  children?: ReactNode;
};

export function MainNav({ items, children }: MainNavProps) {
  const { data: session } = useSession();

  if (session?.error === 'RefreshAccessTokenError') {
    redirect('/login');
  }

  type SessionType = typeof session | null;
  const [loginSession, setLoginSession] = useState<SessionType>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setLoginSession(session);
  }, [session]);

  return (
    <>
      <div className="flex gap-6 lg:gap-10">
        <Link href="/">
          <Logo />
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 lg:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  item.disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
      <nav className="flex items-center gap-3">
        {!loginSession && (
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-4 w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/register/student">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/register/instructor">Instructor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {loginSession && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-4 w-56">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account/enrolled-courses">My Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="#">Testimonials & Certificates</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <p onClick={() => signOut()}>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <button
          className="flex items-center space-x-2 lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </nav>
    </>
  );
}
