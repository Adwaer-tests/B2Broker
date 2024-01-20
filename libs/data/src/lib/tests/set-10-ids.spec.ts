import { DataItem } from '@bb/common';
import { set10Ids, makeDataItem } from '../functions';

const getDataItems = (count: number): DataItem[] =>
  Array.from({ length: count })
    .map((_, index) => makeDataItem(index, count));

describe('set-10-ids', () => {
  const ids10 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  it('should set for 10 items and 10 ids', () => {
    const items = getDataItems(10);

    expect(items.length).toBe(ids10.length);
    expect(items.length).toBe(10);

    set10Ids(items, ids10);

    items.forEach((item, index) => {
      expect(item.id).toBe(ids10[index]);
    });
  });

  it('should set for 3 items and 10 ids', () => {
    const items = getDataItems(3);

    expect(items.length).toBe(3);
    set10Ids(items, ids10);

    items.forEach((item, index) => {
      expect(item.id).toBe(ids10[index]);
    });
  });

  it('should set for 10 items and 3 ids', () => {
    const items = getDataItems(10);
    const ids = ids10.slice(0, 3);

    expect(items.length).toBe(10);
    expect(ids.length).toBe(3);

    const itemsCopy = [...items];
    set10Ids(items, ids);

    items.forEach((item, index) => {
      if (index < 3) {
        expect(item.id).toBe(ids[index]);
      } else {
        expect(item.id).toBe(itemsCopy[index].id);
      }
    });
  });

  it('should set for 20 items and 10 ids', () => {
    const items = getDataItems(20);

    expect(items.length).toBe(20);
    expect(ids10.length).toBe(10);

    const itemsCopy = [...items];
    set10Ids(items, ids10);

    items.forEach((item, index) => {
      if (index < 10) {
        expect(item.id).toBe(ids10[index]);
      } else {
        expect(item.id).toBe(itemsCopy[index].id);
      }
    });
  });

  it('should set for 20 items and 20 ids', () => {
    const items = getDataItems(20);
    const ids = ids10.concat(...ids10);

    expect(items.length).toBe(20);
    expect(ids.length).toBe(20);

    const itemsCopy = [...items];
    set10Ids(items, ids);

    items.forEach((item, index) => {
      if (index < 10) {
        expect(item.id).toBe(ids[index]);
      } else {
        expect(item.id).toBe(itemsCopy[index].id);
      }
    });
  });


});
