import {ProfileInfo} from '@redux/types/profile.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type ProfileState = {
    profileInfo: ProfileInfo;
}

const initialState: ProfileState = {
    profileInfo: {
        firstName: '',
        email: '',
        lastName: '',
        birthday: '',
        imgSrc: '',
        sendNotification: false,
        readyForJointTraining: false,
        tariff: {
            tariffId: '',
            expired: '',
        }
    },
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileInfo: (state, action: PayloadAction<ProfileInfo>) => {
            state.profileInfo = action.payload;
        },
    },
})

export const {setProfileInfo} = slice.actions

export default slice.reducer
