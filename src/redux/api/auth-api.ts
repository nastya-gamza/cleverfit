import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@redux/store.ts';
import {PATHS} from '@constants/paths.ts';
import {BASE_API_URL} from '@constants/api.ts';
import {
    ChangePasswordRequest, ChangePasswordResponse,
    CheckEmailRequest, CheckEmailResponse, ConfirmEmailRequest, ConfirmEmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest
} from '@redux/types/auth.ts';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: PATHS.login,
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: PATHS.register,
                method: 'POST',
                body: credentials,
            }),
        }),
        checkEmail: builder.mutation<CheckEmailResponse, CheckEmailRequest>({
            query: (email) => ({
                url: PATHS.checkEmail,
                method: 'POST',
                body: {email},
            }),
        }),
        confirmEmail: builder.mutation<ConfirmEmailResponse, ConfirmEmailRequest>({
            query: (arg) => ({
                url: PATHS.confirmEmail,
                method: 'POST',
                body: arg,
            }),
        }),
        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (arg) => ({
                url: PATHS.changePassword,
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
