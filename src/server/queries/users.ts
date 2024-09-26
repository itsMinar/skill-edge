import bcrypt from 'bcryptjs';

import { replaceMongoIdInObject } from '~/lib/convert-data';
import UserModel from '~/server/models/user';

export async function getUserByEmail(email: string) {
  const user = await UserModel.findOne({ email: email })
    .select('-password')
    .lean();

  return replaceMongoIdInObject(user);
}

export async function getUserDetails(userId: string) {
  const user = await UserModel.findById(userId).select('-password').lean();
  return replaceMongoIdInObject(user);
}

export async function validatePassword(email: string, password: string) {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}
