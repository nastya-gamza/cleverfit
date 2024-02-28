import {useNavigate} from 'react-router-dom';
import {setCredentials} from '@redux/slices/auth-slice.ts';
import {useRegisterMutation} from '@redux/api/auth-api.ts';
import {isFetchBaseQueryError} from '@redux/helpers/helpers.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {PATHS} from '@constants/paths.ts';
import {RegisterRequest} from '@redux/types/auth.ts';
import {HTTP_STATUSES} from '@constants/http-statuses.ts';

export const useRegister = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, {isLoading}] = useRegisterMutation();
    const onSubmit = async (data: RegisterRequest) => {
        try {
            await register(data).unwrap();
            navigate(PATHS.resultSuccess, {state: {from: 'redirect'}});
            dispatch(setCredentials({credentials: data, retryRegister: false}));
        } catch (e) {
            if (isFetchBaseQueryError(e)) {
                if (e.status === HTTP_STATUSES.conflict) {
                    navigate(PATHS.resultErrorUserExist, {state: {from: 'redirect'}});
                    return;
                }
                navigate(PATHS.resultErrorRegister, {state: {from: 'redirect'}});
                dispatch(setCredentials({credentials: data, retryRegister: true}));
            }
            navigate(PATHS.resultErrorRegister, {state: {from: 'redirect'}});
            dispatch(setCredentials({credentials: data, retryRegister: true}));
        }
    }

    return {onSubmit, isLoading};
}
