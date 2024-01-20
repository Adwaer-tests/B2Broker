const colors = new Map<number, string>([
  [0, 'gray'],
  [1, 'orange'],
  [2, 'red'],
  [3, 'yellow'],
  [4, 'lime'],
  [5, 'lightblue'],
  [6, 'azure'],
  [7, 'white']
]);
const totalColorNumber = colors.size;
export const getRandomColor = () => colors.get(Math.floor(Math.random() * totalColorNumber))!;
