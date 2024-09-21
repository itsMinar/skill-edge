/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
type MongoItem = {
  _id: string | { toString: () => string };
  [key: string]: any;
};

export function replaceMongoIdInArray(
  array: MongoItem[]
): Omit<MongoItem, '_id'>[] {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
}

export function replaceMongoIdInObject<T extends MongoItem>(
  obj: T
): Omit<T, '_id'> {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
}
