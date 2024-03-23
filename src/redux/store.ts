import {createReduxHistoryContext} from 'redux-first-history';
import {authApi} from '@redux/api/auth-api.ts';
import {feedbackApi} from '@redux/api/feedback-api.ts';
import {trainingApi} from '@redux/api/training-api.ts';
import appReducer from '@redux/slices/app-slice.ts';
import authReducer from '@redux/slices/auth-slice.ts';
import trainingReducer from '@redux/slices/training-slice.ts';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createBrowserHistory} from 'history';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({history: createBrowserHistory()});

export const store = configureStore({
    reducer: combineReducers({
        [authApi.reducerPath]: authApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        app: appReducer,
        auth: authReducer,
        training: trainingReducer,
        router: routerReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware, authApi.middleware, feedbackApi.middleware, trainingApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
