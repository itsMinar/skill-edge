'use client';

import { dashboardNavRoutes } from '~/data';

import { SidebarItem } from './sidebar-item';

export function SidebarRoutes() {
  return (
    <div className="flex w-full flex-col">
      {dashboardNavRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
