import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useLazyGetCurrentUserQuery} from '@redux/api/profile-api.ts';
import {authSelector} from '@redux/slices/auth-slice.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(authSelector);
    const localStorageToken = localStorage.getItem('token');
    const {email} = useAppSelector(selectProfileInfo);
    const [getUserTraining] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!auth.token && !localStorageToken ) {
            navigate(PATHS.auth, {replace: true});
        }
    }, [navigate, auth.token, localStorageToken]);

    useEffect(() => {
        if (!email) {
            getUserTraining();
        }
    }, [getUserTraining, email]);

    return <Outlet/>;
};
