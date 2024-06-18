export const choice = (arr) => {
    // 计算权重总和
    const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);
  
    // 生成一个0到totalWeight之间的随机数
    let randomNum = Math.random() * totalWeight;
    // 根据权重选择一个元素
    for (const item of arr) {
      if (randomNum < item.weight) {
        return item;
      }
      randomNum -= item.weight;
    }
    // return items[Math.floor(Math.random() * items.length)];
};