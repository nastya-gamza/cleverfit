import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {authSelector} from '@redux/selectors/selectors.ts';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(authSelector);
    const localStorageToken = localStorage.getItem('token');

    useEffect(() => {
        if (!auth.token && !localStorageToken ) {
            navigate(PATHS.auth, {replace: true});
            return;
        }
    }, [navigate]);

    return <Outlet/>;
};
