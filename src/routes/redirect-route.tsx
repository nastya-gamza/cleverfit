import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {PATHS} from "@constants/paths.ts";

export const RedirectRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const state = location.state;

        if (state?.from !== 'redirect' && localStorage.getItem('token')) {
            navigate(PATHS.main);
            return;
        }

        if (state?.from !== 'redirect') {
            navigate(PATHS.auth);
        }
    }, [location.state, navigate]);

    return <Outlet/>;
};
