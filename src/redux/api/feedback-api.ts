import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {Feedback, FeedbackRequest} from '@redux/types/feedback.ts';
import {TAGS} from '@redux/types/tags.ts';

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFeedbacks: build.query<Feedback[], void>({
            query: () => ENDPOINTS.feedback,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
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
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
            invalidatesTags: [{type: TAGS.feedback, id: 'LIST'}],
        }),
    }),
})

export const {
    useGetFeedbacksQuery,
    usePostFeedbackMutation,
} = feedbackApi;
