import {ChangePasswordRequest, RegisterRequest} from '@redux/types/auth.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AuthState = {
    credentials: RegisterRequest;
    retryRegister: boolean;
    retryEmail: boolean;
    retryPassword: boolean;
    token: string | null;
    email: string;
    password: ChangePasswordRequest;
    loading: boolean;
}

const initialState: AuthState = {
    credentials: {email: '', password: '', confirmPassword: ''},
    retryRegister: false,
    retryEmail: false,
    retryPassword: false,
    token: null,
    email: '',
    password: {password: '', confirmPassword: ''},
    loading: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{credentials: RegisterRequest, retryRegister: boolean}>) => {
            state.credentials = action.payload.credentials;
            state.retryRegister = action.payload.retryRegister;
        },
        setToken: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token;
        },
        setEmail: (state, action: PayloadAction<{ email: string}>) => {
            state.email = action.payload.email;
        },
        setRetryEmail: (state, action: PayloadAction<{ retryEmail: boolean }>) => {
            state.retryEmail = action.payload.retryEmail;
        },
        setPassword: (state, action: PayloadAction<{password: ChangePasswordRequest, retryPassword: boolean }>) => {
            state.password = action.payload.password;
            state.retryPassword = action.payload.retryPassword;
        },
        logout: state => {
            state.token = null;
        }
    },
})

export const {setCredentials, setToken, setEmail, setRetryEmail, setPassword, logout} = slice.actions

export default slice.reducer

