import {createContext} from 'react';

type SidebarContextProps = {
    collapsed: true | false;
    toggleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);
