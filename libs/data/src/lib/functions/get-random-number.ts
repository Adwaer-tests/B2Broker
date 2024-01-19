export const getRandomNumber = (decimalCount: number = 0) => Math.random().toFixed(decimalCount);
export const getRandomNumberInRange = (max: number, decimalCount: number = 0) => (Math.random() * max).toFixed(decimalCount);
