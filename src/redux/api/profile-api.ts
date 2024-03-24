import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {setProfileInfo} from '@redux/slices/profile-slice.ts';
import {ProfileInfo} from '@redux/types/profile.ts';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<ProfileInfo, void>({
            query: () => ENDPOINTS.userMe,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const {data} = await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setProfileInfo(data));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useGetUserQuery,
} = profileApi;
