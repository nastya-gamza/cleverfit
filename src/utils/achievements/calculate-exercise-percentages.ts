type ExerciseData = {
    exercise: string;
    count: number;
}

export const calculateExercisePercentages = (data: ExerciseData[]) => {
    const uniqueExercises = Array.from(new Set(data.map(({ exercise }) => exercise)));

    const exerciseCountMap: Record<string, number> = {};

    data.forEach(({ exercise, count }) => {
        exerciseCountMap[exercise] = (exerciseCountMap[exercise] || 0) + count;
    });

    const totalExercisesCount = Object.values(exerciseCountMap).reduce((total, count) => total + count, 0);

    return uniqueExercises.map(exercise => ({
        exercise,
        percentage: (exerciseCountMap[exercise] || 0) / totalExercisesCount,
    }));
}
