import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {HistoryRouter} from 'redux-first-history/rr6';
import {Loader} from '@components/loader';
import {history, store} from '@redux/store.ts';

import {SidebarProvider} from './context/sidebar/sidebar-provider.tsx';


import 'normalize.css';

import './index.less';

import {routes} from './routes';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SidebarProvider>
                <HistoryRouter history={history}>
                    {routes}
                    <Loader/>
                </HistoryRouter>
            </SidebarProvider>
        </Provider>
    </React.StrictMode>,
);
