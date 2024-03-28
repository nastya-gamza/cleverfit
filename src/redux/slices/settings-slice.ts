import {TariffItem} from '@redux/types/settings.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type SettingsState = {
    tariffList: TariffItem[];
    isShowSuccessModal: boolean;
}

const initialState: SettingsState = {
    tariffList: [{
        _id: '',
        name: '',
        periods: [
            {
                text: '',
                cost: 0,
                days: 0,
            }
        ]
    }],
    isShowSuccessModal: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTariffList: (state, action: PayloadAction<TariffItem[]>) => {
            state.tariffList = action.payload;
        },
        setShowSuccessModal: (state, action: PayloadAction<boolean>) => {
            state.isShowSuccessModal = action.payload
        }
    },
    selectors: {
        selectTariffList: state => state.tariffList,
        selectSuccessModal: state => state.isShowSuccessModal,
    },
})

export const {setTariffList, setShowSuccessModal} = settingsSlice.actions;

export const {selectTariffList, selectSuccessModal} = settingsSlice.selectors;

export default settingsSlice.reducer
