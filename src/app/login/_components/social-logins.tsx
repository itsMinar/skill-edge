import Image from 'next/image';

import { Button } from '~/components/ui/button';
import { doSocialLogin } from '~/server/actions';

export function SocialLogins() {
  return (
    <>
      <div className="text-md mt-3 text-center text-gray-500">
        or SignUp with
      </div>
      <form action={doSocialLogin}>
        <div className="flex justify-center gap-2">
          <Button
            className="mt-4 flex items-center justify-center gap-2 rounded-md border border-gray-600/30 py-2"
            type="submit"
            name="action"
            value="google"
          >
            <Image
              src="/assets/images/google.png"
              alt="google"
              width={25}
              height={25}
            />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </>
  );
}
