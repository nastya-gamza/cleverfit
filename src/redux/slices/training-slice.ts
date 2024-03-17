import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    Exercises,
    TrainingItem,
    UserTraining,
    UserTrainingTransform
} from '@redux/types/training.ts';

type TrainingState = {
    date: string,
    training: string,
    userTraining: UserTrainingTransform,
    trainingList: TrainingItem[],
    createdTraining: UserTraining;
}

const defaultExercises = [
    {
        name: '',
        approaches: 1,
        weight: 0,
        replays: 1,
    },
];

const initialState: TrainingState = {
    date: '',
    training: '',
    userTraining: {},
    trainingList: [],
    createdTraining: {
        name: '',
        date: '',
        id: '',
        isImplementation: false,
        exercises: defaultExercises,
    },
};

const slice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setUserTrainings: (state, action: PayloadAction<UserTrainingTransform>) => {
            state.userTraining = action.payload;
        },
        setTrainingList: (state, action: PayloadAction<TrainingItem[]>) => {
            state.trainingList = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload
        },
        setTraining: (state, action: PayloadAction<string>) => {
            state.training = action.payload
        },
        resetTraining: (state) => {
            state.training = initialState.training;
        },
        addExercises: (state) => {
            state.createdTraining.exercises.push(...defaultExercises);
        },
        setExercisesData: (state, action: PayloadAction<{
            exercise: Exercises;
            index: number
        }>) => {
            const {exercise, index} = action.payload;
            state.createdTraining.exercises[index] = exercise;
        },
        resetCreatedTraining: (state) => {
            state.createdTraining = initialState.createdTraining;
        },
    },
})

export const {
    setUserTrainings,
    setTrainingList,
    setTraining,
    setDate,
    resetTraining,
    addExercises,
    setExercisesData,
    resetCreatedTraining
} = slice.actions

export default slice.reducer;
