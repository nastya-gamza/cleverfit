export const findMostFrequentTraining = (obj: object) => {
    let maxCount = 0;
    let mostFrequentName;

    Object.entries(obj).forEach(([name, count]) => {
        if (count > maxCount) {
            maxCount = count;
            mostFrequentName = name;
        }
    });

    return mostFrequentName;
};
