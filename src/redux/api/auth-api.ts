import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {RootState} from '@redux/store.ts';
import {
    ChangePasswordRequest, ChangePasswordResponse,
    CheckEmailRequest, CheckEmailResponse, ConfirmEmailRequest, ConfirmEmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest
} from '@redux/types/auth.ts';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const {token} = (getState() as RootState).auth;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: ENDPOINTS.login,
                method: 'POST',
                body: credentials,
            }),
        }),
        register: build.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: ENDPOINTS.register,
                method: 'POST',
                body: credentials,
            }),
        }),
        checkEmail: build.mutation<CheckEmailResponse, CheckEmailRequest>({
            query: (email) => ({
                url: ENDPOINTS.checkEmail,
                method: 'POST',
                body: {email},
            }),
        }),
        confirmEmail: build.mutation<ConfirmEmailResponse, ConfirmEmailRequest>({
            query: (arg) => ({
                url: ENDPOINTS.confirmEmail,
                method: 'POST',
                body: arg,
            }),
        }),
        changePassword: build.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (arg) => ({
                url: ENDPOINTS.changePassword,
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
