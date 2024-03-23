import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {setIsError, setIsLoading} from '@redux/slices/app-slice.ts';
import {
    resetCreatedTraining,
    setTrainingList,
    setUserTrainings,
} from '@redux/slices/training-slice.ts';
import {RootState} from '@redux/store.ts';
import {TAGS} from '@redux/types/tags.ts';
import {
    TrainingItem,
    UserTraining,
    UserTrainingByDate
} from '@redux/types/training.ts';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import moment from 'moment';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const lsToken = localStorage.getItem('token');
            const {token} = (getState() as RootState).auth;

            if (lsToken || token) {
                headers.set('Authorization', `Bearer ${lsToken || token}`);
            }

            return headers;
        },
    }),
    tagTypes: [TAGS.training],
    endpoints: (build) => ({
        getUserTrainings: build.query<UserTrainingByDate, void>({
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
                response.reduce((acc: UserTrainingByDate, curr) => {
                    const date = moment(curr.date).format('YYYY-MM-DD');

                    acc[date] = [...(acc[date] ?? []), { ...curr, _id: curr._id }];

                    return acc;
                }, {}),
            providesTags: [{ type: TAGS.training, id: 'LIST' }]
        }),
        getTrainingList: build.query<TrainingItem[], void>({
            query: () => ENDPOINTS.trainingList,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const {data} = await queryFulfilled;

                    dispatch(setTrainingList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
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
