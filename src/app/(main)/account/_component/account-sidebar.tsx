import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '~/server/auth';
import { getUserByEmail } from '~/server/queries/users';

import { AccountMenu } from './account-menu';

export async function AccountSidebar() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const loggedInUser = await getUserByEmail(session.user.email);

  return (
    <div className="md:px-3 lg:w-1/4">
      <div className="relative">
        <div className="rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
          <div className="profile-pic mb-5 text-center">
            <input
              id="pro-img"
              name="profile-image"
              type="file"
              className="hidden"
            />
            <div>
              <div className="relative mx-auto size-28">
                <Image
                  src={loggedInUser.profilePicture}
                  className="rounded-full shadow ring-4 ring-slate-50 dark:shadow-gray-800 dark:ring-slate-800"
                  id="pro-img"
                  alt={loggedInUser.firstName}
                  width={112}
                  height={112}
                />
                <label
                  className="absolute inset-0 cursor-pointer"
                  htmlFor="pro-img"
                />
              </div>
              <div className="mt-4">
                <h5 className="text-lg font-semibold">
                  {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                </h5>
                <p className="text-slate-400">{loggedInUser.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
