import { DataItem } from '@bb/common';
import { getRandomColor } from './get-random-color';
import { getRandomNumber, getRandomNumberInRange } from './get-random-number';

const makeDataItem = (index: number, totalCount: number): DataItem => ({
  id: String(index),
  color: getRandomColor(),
  int: +getRandomNumber(),
  float: +getRandomNumber(18),
  child: {
    id: index + getRandomNumberInRange(totalCount).padStart(totalCount + 1, '0'),
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
