import { DataItem } from '@bb/common';
import { makeGenerator } from './generate-item';

const itemGenerator = makeGenerator();

export const generateArray = (size: number): DataItem[] => {
  const data: DataItem[] = new Array(size);
  const gen = itemGenerator(size);

  for (let i = 0; i < data.length; i++) {
    data[i] = gen.next().value;
  }

  return data;
};
