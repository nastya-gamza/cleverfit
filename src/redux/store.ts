import {createReduxHistoryContext} from 'redux-first-history';
import {baseApi} from '@redux/api/base-api.ts';
import achievementsReducer from '@redux/slices/achievements-slice.ts';
import appReducer from '@redux/slices/app-slice.ts';
import authReducer from '@redux/slices/auth-slice.ts';
import inviteReducer from '@redux/slices/invite-slice.ts';
import profileReducer from '@redux/slices/profile-slice.ts'
import settingsReducer from '@redux/slices/settings-slice.ts';
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
        app: appReducer,
        auth: authReducer,
        training: trainingReducer,
        profile: profileReducer,
        settings: settingsReducer,
        invite: inviteReducer,
        router: routerReducer,
        achievements: achievementsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware, baseApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
