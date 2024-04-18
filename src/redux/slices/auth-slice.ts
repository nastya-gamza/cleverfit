import {ChangePasswordRequest, RegisterRequest} from '@redux/types/auth.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Nullable} from '@typings/nullable.ts';

type AuthState = {
    credentials: RegisterRequest;
    retryRegister: boolean;
    retryEmail: boolean;
    retryPassword: boolean;
    token: Nullable<string>;
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

const authSlice = createSlice({
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
    selectors: {
        authSelector: state => state,
    }
})

export const {setCredentials, setToken, setEmail, setRetryEmail, setPassword, logout} = authSlice.actions;

export const {authSelector} = authSlice.selectors;

export default authSlice.reducer;

