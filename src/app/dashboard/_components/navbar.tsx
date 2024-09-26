'use client';

import { useEffect, useState } from 'react';

import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { type IFetchMe } from '~/types';

import { MobileSidebar } from './mobile-sidebar';

export function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<IFetchMe | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await fetch('/api/me');
        const data = await response.json();

        setLoggedInUser(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    };

    fetchMe();
  }, []);

  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={loggedInUser?.profilePicture}
                  alt={loggedInUser?.firstName}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-4 w-56">
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <p>Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
