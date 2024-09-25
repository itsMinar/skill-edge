import { SocialMediaEntry } from '~/types';

export const replaceMongoIdInArray = (array: any[]) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj: any) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export const convertSocialMediaToArray = (
  data: Record<string, string>
): SocialMediaEntry[] => {
  return Object.entries(data).map(([platform, link]) => ({
    platform,
    link,
  }));
};

export const convertSocialMediaToObject = (
  data: SocialMediaEntry[]
): Record<string, string> => {
  return data.reduce(
    (acc, curr) => {
      acc[curr.platform] = curr.link;
      return acc;
    },
    {} as Record<string, string>
  );
};
