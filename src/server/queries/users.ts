import { replaceMongoIdInObject } from '~/lib/convert-data';
import UserModel from '~/server/models/user';

export async function getUserByEmail(email: string) {
  const user = await UserModel.findOne({ email: email }).lean();

  return replaceMongoIdInObject(user);
}
