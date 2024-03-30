import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {setToken} from '@redux/slices/auth-slice.ts';

export const RootRoute = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('token', accessToken);
            dispatch(setToken({token: accessToken}));
        }

        if (location.pathname === PATHS.root) {
            navigate(PATHS.main)
        }
    }, [navigate, accessToken, location.pathname]);

    return (
        <Outlet/>
    );
}
