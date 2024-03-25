import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {
    ChangePasswordRequest, ChangePasswordResponse,
    CheckEmailRequest, CheckEmailResponse, ConfirmEmailRequest, ConfirmEmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest
} from '@redux/types/auth.ts';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: ENDPOINTS.login,
                method: 'POST',
                body: credentials,
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
        }),
        register: build.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: ENDPOINTS.register,
                method: 'POST',
                body: credentials,
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
        }),
        checkEmail: build.mutation<CheckEmailResponse, CheckEmailRequest>({
            query: (email) => ({
                url: ENDPOINTS.checkEmail,
                method: 'POST',
                body: {email},
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
        }),
        confirmEmail: build.mutation<ConfirmEmailResponse, ConfirmEmailRequest>({
            query: (arg) => ({
                url: ENDPOINTS.confirmEmail,
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
        }),
        changePassword: build.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (arg) => ({
                url: ENDPOINTS.changePassword,
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
