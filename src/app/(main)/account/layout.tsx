import { ReactNode } from 'react';

import { AccountSidebar } from './_component/account-sidebar';

type AccountLayoutProps = {
  tabs: ReactNode;
};

export default function AccountLayout({ tabs }: AccountLayoutProps) {
  return (
    <section className="relative pb-16">
      <div className="container relative mt-10">
        <div className="lg:flex">
          <AccountSidebar />
          <div className="mt-[30px] md:px-3 lg:mt-0 lg:w-3/4">{tabs}</div>
        </div>
      </div>
    </section>
  );
}
