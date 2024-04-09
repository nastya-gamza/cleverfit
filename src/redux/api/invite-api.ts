import {ENDPOINTS} from '@constants/endpoints.ts';
import {Statuses} from '@constants/statuses.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {
    removeJointTraining,
    setInvitationList, setJointTrainingStatus,
    setUserJointTrainingList,
    setUsersAcceptedJointTraining
} from '@redux/slices/invite-slice.ts';
import {
    CreateInvitationRequest,
    Invitation,
    ResponseToInvitationRequest,
    UserJointTrainingList
} from '@redux/types/invite.ts';
import {TAGS} from '@redux/types/tags.ts';

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
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: TAGS.invite as const, id})),
                        {type: TAGS.invite, id: 'LIST'},
                    ]
                    : [{type: TAGS.invite, id: 'LIST'}],
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
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({_id}) => ({type: TAGS.invite as const, _id})),
                        {type: TAGS.invite, id: 'LIST'},
                    ]
                    : [{type: TAGS.invite, id: 'LIST'}],
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
        responseToInvitation: build.mutation<Invitation, ResponseToInvitationRequest>({
            query: (body) => ({
                url: ENDPOINTS.invite,
                method: 'PUT',
                body,
            }),
            async onQueryStarted(data, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setJointTrainingStatus({ id: data.id, status: data.status }));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
            invalidatesTags: [{type: TAGS.invite, id: 'LIST'}],
        }),
        cancelJointTraining: build.mutation<void, { inviteId: string | null }>({
            query: ({inviteId}) => ({
                url: `${ENDPOINTS.invite}/${inviteId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(data, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(removeJointTraining(data));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
            invalidatesTags: [{type: TAGS.invite, id: 'LIST'}],
        }),
    }),
});

export const {
    useLazyGetUserJointTrainingListQuery,
    useGetUsersAcceptingJointTrainingQuery,
    useGetInviteListQuery,
    useCreateInvitationMutation,
    useResponseToInvitationMutation,
    useCancelJointTrainingMutation
} = inviteApi;
