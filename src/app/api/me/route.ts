import { NextResponse } from 'next/server';

import { auth } from '~/server/auth';
import { getUserByEmail } from '~/server/queries/users';
import dbConnect from '~/server/services/db-connect';

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse(`You are not authenticated!`, {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const user = await getUserByEmail(session.user.email);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
};
