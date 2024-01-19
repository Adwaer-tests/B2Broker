import { getRandomNumber, getRandomNumberInRange } from '../functions/get-random-number';

describe('get-random-number', () => {

  it('should have proper decimal count', () => {
    const decimalCounts = [1, 10, 100];

    decimalCounts.forEach(decimalCount => {
      const val = getRandomNumber(decimalCount);
      const decimalsLen = val.split('.')[1].length;

      expect(decimalsLen).toBe(decimalCount);
    });
  });

  it('should have less number than max', () => {
    const maximums = [1, 10, 100, 1000];

    maximums.forEach(max => {
      Array.from({ length: 10 }).forEach(() => {
        const val = +getRandomNumberInRange(max);

        expect(val).toBeLessThanOrEqual(max);
      });

    });
  });
});
