import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {RootState} from '@redux/store.ts';
import {Feedback, FeedbackRequest} from '@redux/types/feedback.ts';
import {TAGS} from '@redux/types/tags.ts';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
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
    tagTypes: [TAGS.feedback],
    endpoints: (build) => ({
        getFeedbacks: build.query<Feedback[], void>({
            query: () => ENDPOINTS.feedback,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: TAGS.feedback as const, id})),
                        {type: TAGS.feedback, id: 'LIST'},
                    ]
                    : [{type: TAGS.feedback, id: 'LIST'}],
        }),
        postFeedback: build.mutation<void, FeedbackRequest>({
            query: (arg) => ({
                url: ENDPOINTS.feedback,
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: [{ type: TAGS.feedback, id: 'LIST' }],
        }),
    }),
})

export const {
    useGetFeedbacksQuery,
    usePostFeedbackMutation,
} = feedbackApi;
