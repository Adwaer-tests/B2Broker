const colors = new Map<number, string>([
  [0, 'gray'],
  [1, 'black'],
  [2, 'red'],
  [3, 'yellow'],
  [4, 'green'],
  [5, 'blue'],
  [6, 'purple'],
  [7, 'white']
]);
const totalColorNumber = colors.size;
export const getRandomColor = () => colors.get(Math.floor(Math.random() * totalColorNumber))!;
