import {useNavigate} from 'react-router-dom';
import {HttpStatuses} from '@constants/http-statuses.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useRegisterMutation} from '@redux/api/auth-api.ts';
import {isFetchBaseQueryError} from '@redux/helpers/helpers.ts';
import {setCredentials} from '@redux/slices/auth-slice.ts';
import {RegisterRequest} from '@redux/types/auth.ts';

export const useRegister = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, {isLoading}] = useRegisterMutation();
    const onSubmit = async (data: RegisterRequest) => {
        try {
            await register(data).unwrap();
            navigate(PATHS.resultSuccess, {state: {from: 'redirect'}});
            dispatch(setCredentials({credentials: data, retryRegister: false}));
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                if (err.status === HttpStatuses.conflict) {
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
