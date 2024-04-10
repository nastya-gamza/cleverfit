import { v4 as uuidv4 } from 'uuid';
import {
    Exercise,
    TrainingItem, TrainingMode,
    UserTraining,
    UserTrainingByDate
} from '@redux/types/training.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TrainingState = {
    date: string;
    training: string;
    trainingMode: TrainingMode;
    userTraining: UserTrainingByDate;
    trainingList: TrainingItem[];
    createdTraining: UserTraining;
    isDrawerOpen: boolean;
}

const initialExerciseState = {
        name: '',
        approaches: null,
        weight: null,
        replays: null,
    };

const initialState: TrainingState = {
    date: '',
    training: '',
    trainingMode: TrainingMode.NEW,
    userTraining: {},
    trainingList: [],
    createdTraining: {
        name: '',
        date: '',
        _id: '',
        isImplementation: false,
        parameters: {
            repeat: false,
            period: null,
            jointTraining: false,
            participants: [],
        },
        exercises: [initialExerciseState],
    },
    isDrawerOpen: false,
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setUserTrainings: (state, action: PayloadAction<UserTrainingByDate>) => {
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
        setTrainingMode: (state, action: PayloadAction<TrainingMode>) => {
            state.trainingMode = action.payload
        },
        resetTraining: (state) => {
            state.training = initialState.training;
        },
        addExercises: (state) => {
            state.createdTraining.exercises.push({...initialExerciseState, tempId: uuidv4()});
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
        setCreatedTraining: (state, action: PayloadAction<Partial<UserTraining>>) => {
            state.createdTraining = {...state.createdTraining, ...action.payload};

        },
        resetCreatedTraining: (state) => {
            state.createdTraining = initialState.createdTraining;
        },
        setIsOpenTrainingDrawer: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        }
    },
    selectors: {
        selectTrainingData: state => state,
        selectCreatedTraining: state => state.createdTraining,
    },
})

export const {
    setUserTrainings,
    setTrainingList,
    setTraining,
    setDate,
    setTrainingMode,
    resetTraining,
    addExercises,
    setExerciseData,
    setExercises,
    resetCreatedTraining,
    setCreatedTraining,
    setIsOpenTrainingDrawer,
} = trainingSlice.actions

export const {selectTrainingData, selectCreatedTraining} = trainingSlice.selectors;

export default trainingSlice.reducer;
