export const getMostFrequentExercisesByDay = (arr: Array<{date: string, exerciseCount: Record<string, number>}>) => (
    arr.map(({date, exerciseCount}) => {
        let mostFrequentExercise = '';
        let maxCount = 0;

        Object.entries(exerciseCount).forEach(([exercise, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostFrequentExercise = exercise;
            }
        });

        return {date, exercise: mostFrequentExercise, count: maxCount};
    })
);
