import {useContext} from 'react';

import {SidebarContext} from './sidebar-context.ts';

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error('useSidebarContext must be used within a sidebarProvider');
    }

    return context;
};
