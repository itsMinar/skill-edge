import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

type ProviderWrapperProps = {
  children: ReactNode;
};

export function ProviderWrapper({ children }: ProviderWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
