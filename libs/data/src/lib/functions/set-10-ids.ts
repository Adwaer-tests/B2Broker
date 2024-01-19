import { DataItem } from '@bb/common';

export const set10Ids = (array: DataItem[], ids: string[]) => {
  const top10 = array.slice(0, 10);
  for (let i = 0; i < top10.length && i < ids.length; i++) {
    top10[i].id = ids[i];
  }
};
