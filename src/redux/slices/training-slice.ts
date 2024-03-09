import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TrainingItem, UserTrainingItem} from '@redux/types/training.ts';

type TrainingState = {
    userTraining: UserTrainingItem[],
    trainingList: TrainingItem[],
}

const initialState: TrainingState = {
    userTraining: [],
    trainingList: [],
};

const slice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setUserTrainings: (state, action: PayloadAction<UserTrainingItem[]>) => {
            state.userTraining = action.payload;
        },
        setTrainingList: (state, action: PayloadAction<TrainingItem[]>) => {
            state.trainingList = action.payload;
        },
    },
})

export const {setUserTrainings, setTrainingList} = slice.actions

export default slice.reducer;
