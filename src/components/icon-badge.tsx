import { cva } from 'class-variance-authority';
import { LucideProps } from 'lucide-react';

import { cn } from '~/lib/utils';

const backgroundVariants = cva(
  'rounded-full flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-emerald-100',
        success: 'bg-emerald-100',
      },
      size: {
        default: 'p-2',
        sm: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-emerald-600',
      success: 'text-emerald-700',
    },
    size: {
      default: 'h-8 w-8',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Define the types for variants and sizes
type BackgroundVariant = 'default' | 'success';
type BackgroundSize = 'default' | 'sm';

// Define the props interface
interface IconBadgeProps {
  icon: React.FC<LucideProps>;
  variant?: BackgroundVariant;
  size?: BackgroundSize;
}

export function IconBadge({
  icon: Icon,
  variant = 'default',
  size = 'default',
}: IconBadgeProps) {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
}
