import {ReactNode, useState} from 'react';
import {SidebarContext} from './sidebar-context.ts';

type SidebarProviderProps = {
    children: ReactNode;
}

export const SidebarProvider = ({children}: SidebarProviderProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return <SidebarContext.Provider
        value={{collapsed, toggleCollapsed}}>{children}</SidebarContext.Provider>;
};
