import {UserJointTrainingList} from '@redux/types/invite.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type InviteState = {
    userJointTrainingList: UserJointTrainingList[];
}

const initialState: InviteState = {
    userJointTrainingList: []
};

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setUserJointTrainingList: (state, action: PayloadAction<UserJointTrainingList[]>) => {
            state.userJointTrainingList = action.payload;
        },
    },
    selectors: {
        selectUserJointTrainings: state => state,
    },
})

export const {setUserJointTrainingList} = inviteSlice.actions;

export const {selectUserJointTrainings} = inviteSlice.selectors;

export default inviteSlice.reducer
