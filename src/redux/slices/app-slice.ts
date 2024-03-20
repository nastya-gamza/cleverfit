import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AppState = {
    isError: boolean,
    isLoading: boolean,
}

const initialState: AppState = {
    isError: false,
    isLoading: false,
};

const appSlice = createSlice({
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
    selectors: {
        selectIsError: state => state.isError,
        selectIsLoading: state => state.isLoading,
    }
})

export const {setIsError, setIsLoading} = appSlice.actions;

export const {selectIsError, selectIsLoading} = appSlice.selectors;

export default appSlice.reducer;
