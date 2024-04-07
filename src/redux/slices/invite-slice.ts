import {Invitation, UserJointTrainingList} from '@redux/types/invite.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type InviteState = {
    userJointTrainingList: UserJointTrainingList[];
    invitationList: Invitation[];
    partnerInfo: UserJointTrainingList;
}

const initialState: InviteState = {
    userJointTrainingList: [],
    invitationList: [],
    partnerInfo: {
        id: '',
        name: null,
        trainingType: '',
        imageSrc: null,
        avgWeightInWeek: 0,
        status: null,
        inviteId: null
    },
};

const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setUserJointTrainingList: (state, action: PayloadAction<UserJointTrainingList[]>) => {
            state.userJointTrainingList = action.payload;
        },
        setUsersAcceptingJointTraining: (state, action: PayloadAction<UserJointTrainingList[]>) => {
            state.userJointTrainingList = action.payload;
        },
        setInvitationList: (state, action: PayloadAction<Invitation[]>) => {
            state.invitationList = action.payload;
        },
        setPartnerInfo: (state, action: PayloadAction<UserJointTrainingList>) => {
            state.partnerInfo = action.payload;
        },
    },
    selectors: {
        selectUserJointTrainings: state => state,
    },
})

export const {
    setUserJointTrainingList,
    setUsersAcceptingJointTraining,
    setInvitationList,
    setPartnerInfo,
} = inviteSlice.actions;

export const {selectUserJointTrainings} = inviteSlice.selectors;

export default inviteSlice.reducer
