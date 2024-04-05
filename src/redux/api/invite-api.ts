import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {setUserJointTrainingList} from '@redux/slices/invite-slice.ts';
import {UserJointTrainingList} from '@redux/types/invite.ts';

export const inviteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserJointTrainingList: build.query<UserJointTrainingList[], void>({
            query: () => ENDPOINTS.userJointTrainingList,
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
    }),
});

export const {
    useGetUserJointTrainingListQuery,
} = inviteApi;
