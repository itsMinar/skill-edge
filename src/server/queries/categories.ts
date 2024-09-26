import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '~/lib/convert-data';
import CategoryModel from '~/server/models/category';

export async function getCategories() {
  try {
    const categories = await CategoryModel.find({}).lean();
    return replaceMongoIdInArray(categories);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}

export async function getCategoryDetails(categoryId: string) {
  try {
    const category = await CategoryModel.findById(categoryId).lean();
    return replaceMongoIdInObject(category);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}
