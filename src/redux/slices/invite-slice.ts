import {Invitation, UserJointTrainingList} from '@redux/types/invite.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type InviteState = {
    invitationList: Invitation[];
    userJointTrainingList: UserJointTrainingList[];
    acceptedJointTrainingList: UserJointTrainingList[];
    partnerInfo: UserJointTrainingList;
}

const initialState: InviteState = {
    userJointTrainingList: [],
    invitationList: [],
    acceptedJointTrainingList: [],
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
        setUsersAcceptedJointTraining: (state, action: PayloadAction<UserJointTrainingList[]>) => {
            state.acceptedJointTrainingList = action.payload;
        },
        setInvitationList: (state, action: PayloadAction<Invitation[]>) => {
            state.invitationList = action.payload;
        },
        setPartnerInfo: (state, action: PayloadAction<UserJointTrainingList>) => {
            state.partnerInfo = action.payload;
        },
        setJointTrainingStatus(
            state,
            {payload: {id, status}}: PayloadAction<{ id: string; status: string }>,
        ) {
            state.userJointTrainingList = state.userJointTrainingList.map(user => user.id === id ? {
                ...user,
                status
            } : user);
        },
        removeJointTraining(
            state,
            {payload: {inviteId}}: PayloadAction<{ inviteId: string | null }>,
        ) {
            state.acceptedJointTrainingList = state.acceptedJointTrainingList.filter(user => user.inviteId !== inviteId);
        },
    },
    selectors: {
        selectUserJointTrainings: state => state,
    },
})

export const {
    setUserJointTrainingList,
    setUsersAcceptedJointTraining,
    setInvitationList,
    setPartnerInfo,
    setJointTrainingStatus,
    removeJointTraining,
} = inviteSlice.actions;

export const {selectUserJointTrainings} = inviteSlice.selectors;

export default inviteSlice.reducer
