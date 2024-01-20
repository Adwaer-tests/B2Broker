import { getRandomColor } from '../functions';

describe('get-random-color', () => {
  it('should return color', () => {
    Array.from({ length: 100 }).forEach(() => {
      expect(getRandomColor()).toBeDefined();
    });
  });
});
