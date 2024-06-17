export const choice = (items) => {
    // let cumulativeProbs = [];
    // let cumulativeSum = 0;

    // items.forEach((item) => {
    //     cumulativeSum += item.prob;
    //     cumulativeProbs.push(cumulativeSum);
    // });

    // const random = Math.random();

    // for (let i = 0; i < cumulativeProbs.length; i++) {
    //     if (random < cumulativeProbs[i]) {
    //         return items[i];
    //     }
    // }
    return items[Math.floor(Math.random() * items.length)];
};