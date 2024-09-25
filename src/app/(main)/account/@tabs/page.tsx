import { auth } from '~/server/auth';
import { getUserByEmail } from '~/server/queries/users';

import { ChangePassword } from '../_component/change-password';
import { ContactInfo } from '../_component/contact-info';
import { PersonalDetails } from '../_component/personal-details';

export default async function AccountDetails() {
  const session = await auth();

  const loggedInUser = await getUserByEmail(session?.user?.email as string);

  return (
    <>
      <PersonalDetails userInfo={loggedInUser} />
      <div className="mt-[30px] rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ContactInfo userInfo={loggedInUser} />

          <ChangePassword email={loggedInUser.email} />
        </div>
      </div>
    </>
  );
}
