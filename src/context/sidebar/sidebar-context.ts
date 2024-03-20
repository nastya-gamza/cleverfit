import {createContext, SetStateAction} from 'react';

type SidebarContextProps = {
    collapsed: true | false;
    setCollapsed:  (value: SetStateAction<boolean>) => void
    toggleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);
