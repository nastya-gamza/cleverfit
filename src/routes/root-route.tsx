import {Outlet, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useEffect} from 'react';
import {setToken} from '@redux/slices/auth-slice.ts';
import {PATHS} from '@constants/paths.ts';

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
    }, [navigate]);

    return (
        <Outlet/>
    );
}
