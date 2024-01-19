import { generateArray } from '../functions/generate-array';

describe('generate-array', () => {
  it('should generate proper items count', () => {
    const testCases = [1, 10, 100];
    testCases.forEach((count) => {
      const arr = generateArray(count);

      expect(arr.length).toEqual(count);
    })
  });
});
