import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {Feedback, FeedbackRequest} from '@redux/types/feedback.ts';
import {TAGS} from '@redux/types/tags.ts';

export const feedbackApi = baseApi.injectEndpoints({
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
            invalidatesTags: [{type: TAGS.feedback, id: 'LIST'}],
        }),
    }),
})

export const {
    useGetFeedbacksQuery,
    usePostFeedbackMutation,
} = feedbackApi;
