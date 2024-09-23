'use server';

import { signIn } from '~/server/auth';

export async function credentialLogin(formData: FormData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
}

export async function doSocialLogin(formData: FormData) {
  const action = formData.get('action') as string;

  await signIn(action, { redirectTo: '/courses' });
}
