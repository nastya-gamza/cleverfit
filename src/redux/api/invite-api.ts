import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {
    setInvitationList,
    setUserJointTrainingList,
    setUsersAcceptingJointTraining
} from '@redux/slices/invite-slice.ts';
import {Invitation, UserJointTrainingList} from '@redux/types/invite.ts';

export const inviteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserJointTrainingList: build.query<UserJointTrainingList[], { trainingType?: string, status?: string }>({
            query: (params) => {
                const queryParams: Record<string, string | undefined> = {};

                if (params.trainingType) {
                    queryParams.trainingType = params.trainingType;
                }

                if (params.status) {
                    queryParams.status = params.status;
                }

                return {
                    url: ENDPOINTS.userJointTrainingList,
                    params: queryParams,
                };
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const {data} = await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setUserJointTrainingList(data));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        getUsersAcceptingJointTraining: build.query<UserJointTrainingList[], void>({
            query: () => ENDPOINTS.usersAcceptingJointTraining,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setUsersAcceptingJointTraining(data));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        getInviteList: build.query<Invitation[], void>({
            query: () => ENDPOINTS.invite,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setInvitationList(data));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useLazyGetUserJointTrainingListQuery,
    useGetUsersAcceptingJointTrainingQuery,
    useGetInviteListQuery,
} = inviteApi;
