import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@redux/store.ts';
import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {TAGS} from '@redux/types/tags.ts';
import {TrainingItem, UserTrainingItem} from '@redux/types/training.ts';
import {setUserTrainings, setTrainingList} from '@redux/slices/training-slice.ts';
import {setIsError, setIsLoading} from '@redux/slices/app-slice.ts';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const lsToken = localStorage.getItem('token');
            const token = (getState() as RootState).auth.token;

            if (lsToken || token) {
                headers.set('Authorization', `Bearer ${lsToken || token}`);
            }
            return headers;
        },
    }),
    tagTypes: [TAGS.training],
    endpoints: (build) => ({
        getUserTrainings: build.query<UserTrainingItem[], void>({
            query: () => ENDPOINTS.training,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;
                    console.log(data);
                    dispatch(setIsLoading(false));
                    dispatch(setUserTrainings(data));
                } catch (err) {
                    dispatch(setIsError(true));
                    dispatch(setIsLoading(false));
                }
            },
        }),
        getTrainingList: build.query<TrainingItem[], void>({
            query: () => ENDPOINTS.trainingList,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data.map(item => item.name))
                    dispatch(setTrainingList(data));
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
})

export const {
    useGetTrainingListQuery,
    useGetUserTrainingsQuery,
} = trainingApi;
