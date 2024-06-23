import { presetPalettes, generate, cyan, green, red } from '@ant-design/colors';

export const weight2prob = (arr, weight) => {
  const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);
  const prob = weight / totalWeight;
  return prob.toFixed(2);
};

export const choice = (arr) => {
  const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);
  const rand = Math.random() * totalWeight;
  let acc = 0;
  for (let i = 0; i < arr.length; i++) {
    acc += arr[i].weight;
    if (rand < acc) {
      return arr[i];
    }
  }
};

export const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

export const presets = genPresets({
  primary: generate('#1890ff'),
  red,
  green,
  cyan,
});
