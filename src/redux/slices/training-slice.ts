import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    Exercise,
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
        approaches: null,
        weight: null,
        replays: null,
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
        _id: '',
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
        setExercises: (state, action: PayloadAction<Exercise[]>) => {
            state.createdTraining.exercises = action.payload;
        },
        setExerciseData: (state, action: PayloadAction<{
            exercise: Exercise;
            index: number
        }>) => {
            const {exercise, index} = action.payload;
            state.createdTraining.exercises[index] = exercise;
        },
        setCreatedTraining: (state, action: PayloadAction<UserTraining>) => {
            state.createdTraining = action.payload;
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
    setExerciseData,
    setExercises,
    resetCreatedTraining,
    setCreatedTraining
} = slice.actions

export default slice.reducer;
