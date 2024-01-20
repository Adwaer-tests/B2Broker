import { makeGenerator } from '../functions';
import { DataItem } from '@bb/common';

describe('generate-item', () => {
  let itemGenerator: (totalCount: number) => Generator<DataItem, DataItem>;

  beforeEach(() => {
    itemGenerator = makeGenerator();
  });

  it('should generate new item', () => {
    const gen = itemGenerator(1);
    const { value: item } = gen.next();

    expect(item).toBeDefined();
  });

  it('should use cached values', () => {
    const gen = itemGenerator(3);

    const items = [gen.next().value, gen.next().value, gen.next().value];

    expect(items[0]).toBeDefined();
    expect(items[1]).toBeDefined();
    expect(items[2]).toBeDefined();

    const gen2 = itemGenerator(3);
    expect(gen2.next().value).toEqual(items[0]);
    expect(gen2.next().value).toEqual(items[1]);
    expect(gen2.next().value).toEqual(items[2]);
  });

  it('should use cached values then generates new', () => {
    const gen = itemGenerator(3);

    const items = [gen.next().value, gen.next().value, gen.next().value];
    expect(items[0]).toBeDefined();
    expect(items[1]).toBeDefined();
    expect(items[2]).toBeDefined();

    const gen2 = itemGenerator(7);
    expect(gen2.next().value).toEqual(items[0]);
    expect(gen2.next().value).toEqual(items[1]);
    expect(gen2.next().value).toEqual(items[2]);

    Array.from({ length: 4 })
      .forEach(() => {
        const newItem = gen2.next().value;
        expect(newItem).not.toEqual(items[0]);
        expect(newItem).not.toEqual(items[1]);
        expect(newItem).not.toEqual(items[2]);
      });
  });
});
