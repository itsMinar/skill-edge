import { ReactNode } from 'react';

import { cn } from '~/lib/utils';

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn('text-xl font-bold md:text-2xl lg:text-3xl', className)}>
      {children}
    </h2>
  );
}
