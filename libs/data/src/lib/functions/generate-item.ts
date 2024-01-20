import { DataItem } from '@bb/common';
import { getRandomColor } from './get-random-color';
import { getRandomNumberInRange } from './get-random-number';

export const makeDataItem = (index: number, totalCount: number): DataItem => ({
  id: getRandomNumberInRange(totalCount),
  color: getRandomColor(),
  int: +getRandomNumberInRange(1000000000),
  float: getRandomNumberInRange(100, 18),
  child: {
    id: getRandomNumberInRange(10) + getRandomNumberInRange(totalCount).padStart(String(totalCount).length, '0'),
    color: getRandomColor()
  }
});

export function makeGenerator(): (totalCount: number) => Generator<DataItem, DataItem> {
  const cachedItems: DataItem[] = [];

  return function* itemGenerator(totalCount: number): Generator<DataItem, DataItem> {
    let index = 0;
    while (cachedItems.length > index) {
      yield cachedItems[index];

      index++;
    }

    cachedItems.length = totalCount;
    while (true) {
      const newItem = makeDataItem(index, totalCount);
      yield cachedItems[index] = newItem;

      index++;
    }
  };
}
