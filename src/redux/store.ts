import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createReduxHistoryContext} from 'redux-first-history';
import {createBrowserHistory} from 'history';
import {authApi} from '@redux/api/auth-api.ts';
import authReducer from '@redux/slices/auth-slice.ts';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({history: createBrowserHistory()});

export const store = configureStore({
    reducer: combineReducers({
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        router: routerReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, authApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
