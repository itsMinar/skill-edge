'use server';

import { revalidatePath } from 'next/cache';

import bcrypt from 'bcryptjs';

import UserModel, { type IUser } from '../models/user';
import { validatePassword } from '../queries/users';

export async function updateUserInfo(email: string, updatedData: IUser) {
  try {
    await UserModel.findOneAndUpdate({ email }, updatedData);
    revalidatePath('/account');
  } catch (error) {
    throw new Error(
      `Failed to update user info: ${error instanceof Error ? error.message : error}`
    );
  }
}

export async function changePassword(
  email: string,
  oldPassword: string,
  newPassword: string
) {
  const isMatch = await validatePassword(email, oldPassword);

  if (!isMatch) {
    throw new Error('Please enter a Correct current password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  const dataToUpdate = {
    password: hashedPassword,
  };

  try {
    await UserModel.findOneAndUpdate({ email }, dataToUpdate);
    revalidatePath('/account');
  } catch (error) {
    throw new Error(
      `Failed to change password: ${error instanceof Error ? error.message : error}`
    );
  }
}
