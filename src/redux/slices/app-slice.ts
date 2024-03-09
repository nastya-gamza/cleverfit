import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AppState = {
    isError: boolean,
    isLoading: boolean,
}

const initialState: AppState = {
    isError: false,
    isLoading: false,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
    },
})

export const {setIsError, setIsLoading} = slice.actions

export default slice.reducer;
