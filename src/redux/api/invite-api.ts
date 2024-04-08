import {ENDPOINTS} from '@constants/endpoints.ts';
import {Statuses} from '@constants/statuses.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {
    setInvitationList, setJointTrainingStatus,
    setUserJointTrainingList,
    setUsersAcceptedJointTraining
} from '@redux/slices/invite-slice.ts';
import {CreateInvitationRequest, Invitation, UserJointTrainingList} from '@redux/types/invite.ts';

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
                    dispatch(setUsersAcceptedJointTraining(data));
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
        createInvitation: build.mutation<Invitation, CreateInvitationRequest>({
            query: (body) => ({
                url: ENDPOINTS.invite,
                method: 'POST',
                body,
            }),
            async onQueryStarted(data, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setJointTrainingStatus({ id: data.to, status: Statuses.pending }));
                } catch (err) {
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
    useCreateInvitationMutation,
} = inviteApi;
