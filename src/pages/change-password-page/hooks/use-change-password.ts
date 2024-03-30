import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useChangePasswordMutation} from '@redux/api/auth-api.ts';
import {setPassword} from '@redux/slices/auth-slice.ts';
import {ChangePasswordRequest} from '@redux/types/auth.ts';

export const useChangePassword = () => {
    const [changePassword, {isLoading}] = useChangePasswordMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit = async (data: ChangePasswordRequest) => {
        try {
            await changePassword(data).unwrap();
            navigate(PATHS.resultSuccessChangePassword, {state: {from: 'redirect'}});
            dispatch(setPassword({password: data, retryPassword: false}));
        } catch {
            navigate(PATHS.resultErrorChangePassword, {state: {from: 'redirect'}});
            dispatch(setPassword({password: data, retryPassword: true}));
        }
    }

    return {onSubmit, isLoading}
}
