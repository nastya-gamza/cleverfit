import {BASE_API_URL} from '@constants/api.ts';
import {RootState} from '@redux/store.ts';
import {TAGS} from '@redux/types/tags.ts';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const lsToken = localStorage.getItem('token');
            const { token } = (getState() as RootState).auth;

            if (lsToken || token) {
                headers.set('Authorization', `Bearer ${lsToken || token}`);
            }

            return headers;
        },
    }),
    tagTypes: [TAGS.feedback, TAGS.training, TAGS.profile, TAGS.invite],
    endpoints: () => ({}),
});
