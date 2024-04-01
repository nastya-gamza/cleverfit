import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AlertProps} from 'antd';

type AppState = {
    isError: boolean;
    isLoading: boolean;
    alert: AlertProps & { dataTestId: string };
}

const initialState: AppState = {
    isError: false,
    isLoading: false,
    alert: {dataTestId: ''},
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setAlert(state, action: PayloadAction<AlertProps & { dataTestId: string }>) {
            state.alert = action.payload;
        },
    },
    selectors: {
        selectIsError: state => state.isError,
        selectAlert: state => state.alert,
    }
})

export const {setIsError, setIsLoading, setAlert} = appSlice.actions;

export const {selectIsError, selectAlert} = appSlice.selectors;

export default appSlice.reducer;
