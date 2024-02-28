import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import { HistoryRouter } from "redux-first-history/rr6";
import {SidebarProvider} from "./context/sidebar/sidebar-provider.tsx";

import {history, store} from '@redux/store.ts';
import 'normalize.css';
import './index.less';
import {routes} from "./routes/routes.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SidebarProvider>
                <HistoryRouter history={history}>
                    {routes}
                </HistoryRouter>
            </SidebarProvider>
        </Provider>
    </React.StrictMode>,
);
