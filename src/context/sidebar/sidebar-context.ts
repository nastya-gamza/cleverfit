import {createContext} from 'react';

interface SidebarContextProps {
    collapsed: true | false;
    toggleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);
