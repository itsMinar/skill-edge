'use client';

import { usePathname, useRouter } from 'next/navigation';

import { type LucideIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
        isActive &&
          'bg-emerald-200/20 text-emerald-600 hover:bg-emerald-200/20 hover:text-emerald-600'
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-emerald-600')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto h-full border-2 border-emerald-600 opacity-0 transition-all',
          isActive && 'opacity-100'
        )}
      />
    </button>
  );
}
