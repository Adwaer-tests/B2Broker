import { getRandomColor } from '../functions/get-random-color';

describe('get-random-color', () => {
  it('should return color', () => {
    Array.from({ length: 100 }).forEach(() => {
      expect(getRandomColor()).toBeDefined();
    });
  });
});
