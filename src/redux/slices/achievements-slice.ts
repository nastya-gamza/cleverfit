import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AchievementsState = {
    selectedTag: {
        key: number,
        value: string,
    };
}

const initialState: AchievementsState = {
    selectedTag: {
        key: -1,
        value: '',
    },
};

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        setSelectedTag: (state, action: PayloadAction<{key: number, value: string}>) => {
            state.selectedTag = action.payload;
        },
    },
    selectors: {
        selectAchievements: state => state.selectedTag,
    },
})

export const {
    setSelectedTag,
} = achievementsSlice.actions;

export const {selectAchievements} = achievementsSlice.selectors;

export default achievementsSlice.reducer
