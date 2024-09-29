import { cva } from 'class-variance-authority';
import { AlertTriangle, CheckCircleIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

type BannerVariant = 'warning' | 'success';

const bannerVariants = cva(
  'border text-center p-4 text-sm flex items-center w-full',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-200/80 border-yellow-30 text-primary',
        success: 'bg-emerald-700 border-emerald-800 text-secondary',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  }
);

type TIconMap = {
  warning: typeof AlertTriangle;
  success: typeof CheckCircleIcon;
};

const iconMap: TIconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

interface AlertBannerProps {
  label: string;
  variant?: BannerVariant;
  className?: string;
}

export function AlertBanner({
  label,
  variant = 'warning',
  className,
}: AlertBannerProps) {
  const Icon = iconMap[variant];

  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </div>
  );
}
