import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@redux/store.ts';
import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {TAGS} from '@redux/types/tags.ts';
import {
    TrainingItem,
    UserTraining,
    UserTrainingTransform
} from '@redux/types/training.ts';
import {
    setUserTrainings,
    setTrainingList,
    resetCreatedTraining,
} from '@redux/slices/training-slice.ts';
import {setIsError, setIsLoading} from '@redux/slices/app-slice.ts';
import moment from 'moment';

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
        getUserTrainings: build.query<UserTrainingTransform, void>({
            query: () => ENDPOINTS.training,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const {data} = await queryFulfilled;
                    dispatch(setIsLoading(false));
                    dispatch(setUserTrainings(data));
                } catch (err) {
                    dispatch(setIsError(true));
                    dispatch(setIsLoading(false));
                }
            },
            transformResponse: (response: Array<Omit<UserTraining, 'id'> & { _id: string }>) =>
                response.reduce((acc: UserTrainingTransform, curr) => {
                    const key = moment(curr.date).format('YYYY-MM-DD');

                    if (acc[key]?.length) {
                        acc[key].push({ ...curr, _id: curr._id });
                    } else {
                        acc[key] = [{ ...curr, _id: curr._id }];
                    }

                    return acc;
                }, {}),
            providesTags: [{ type: TAGS.training, id: 'LIST' }]
        }),
        getTrainingList: build.query<TrainingItem[], void>({
            query: () => ENDPOINTS.trainingList,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setTrainingList(data));
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        createTraining: build.mutation<void, UserTraining>({
            query: (body) => ({
                url: ENDPOINTS.training,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(resetCreatedTraining());
                    dispatch(setIsLoading(false));
                }
            },
            invalidatesTags: [{type: TAGS.training, id: 'LIST'}],
        }),
        updateTraining: build.mutation<UserTraining, UserTraining>({
            query: (body) => ({
                url: `training/${body._id}`,
                method: 'PUT',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
            invalidatesTags: [{ type: TAGS.training, id: 'LIST' }],
        }),
    }),
})

export const {
    useGetTrainingListQuery,
    useGetUserTrainingsQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} = trainingApi;
