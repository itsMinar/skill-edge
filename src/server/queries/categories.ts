import { replaceMongoIdInArray } from '~/lib/convert-data';
import CategoryModel from '~/server/models/category';

export async function getCategories() {
  const categories = await CategoryModel.find({}).lean();
  return replaceMongoIdInArray(categories);
}
