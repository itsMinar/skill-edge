'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signOut } from 'next-auth/react';

import { Button } from '~/components/ui/button';

const menu = [
  { label: 'Profile', href: '/account' },
  { label: 'Enrolled Courses', href: '/account/enrolled-courses' },
];

export function AccountMenu() {
  const pathname = usePathname();

  return (
    <ul className="sidebar-nav mb-0 mt-3 list-none" id="navmenu-nav">
      {menu.map((item, i) => (
        <li className="navbar-item account-menu" key={i}>
          <Link
            href={item.href}
            className={`navbar-link flex items-center rounded py-2 ${
              pathname === item.href ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <h6 className="mb-0 font-semibold">{item?.label}</h6>
          </Link>
        </li>
      ))}
      <li className="navbar-item account-menu py-2">
        <Button
          className="px-6"
          variant="destructive"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </li>
    </ul>
  );
}
