import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {SidebarProvider} from "./context/sidebar/sidebar-provider.tsx";

import {store} from '@redux/configure-store';
import 'normalize.css';
import './index.less';
import {PageLayout} from '@components/layout';
import {MainPage} from "@pages/main-page";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SidebarProvider>
                <HashRouter>
                    <Routes>
                        <Route path='/' element={<PageLayout/>}>
                            <Route index element={<MainPage/>}/>
                        </Route>
                    </Routes>
                </HashRouter>
            </SidebarProvider>
        </Provider>
    </React.StrictMode>,
);
