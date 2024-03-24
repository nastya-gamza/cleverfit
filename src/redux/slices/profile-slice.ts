import {ProfileInfo} from '@redux/types/profile.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type ProfileState = {
    profileInfo: ProfileInfo;
}

const initialState: ProfileState = {
    profileInfo: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: false,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        }
    },
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileInfo: (state, action: PayloadAction<ProfileInfo>) => {
            state.profileInfo = action.payload;
        },
    },
    selectors: {
        selectProfileInfo: state => state.profileInfo,
    },
})

export const {setProfileInfo} = profileSlice.actions;

export const {selectProfileInfo} = profileSlice.selectors;

export default profileSlice.reducer
