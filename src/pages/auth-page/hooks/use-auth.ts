import {useNavigate} from 'react-router-dom';
import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useCheckEmailMutation, useLoginMutation} from '@redux/api/auth-api.ts';
import {setEmail, setRetryEmail, setToken} from '@redux/slices/auth-slice.ts';
import {FormInstance} from 'antd';

export type FormFields = {
    email: string;
    password: string;
    remember: boolean;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();

    const onSubmit = async (data: FormFields) => {
        try {
            const response = await login({email: data.email, password: data.password}).unwrap();

            navigate(PATHS.main, {state: {from: 'redirect'}});

            if (data.remember) {
                localStorage.setItem('token', response.accessToken);
                dispatch(setToken({token: response.accessToken}));
            }

            dispatch(setToken({token: response.accessToken}));
        } catch {
            navigate(PATHS.resultErrorLogin, {state: {from: 'redirect'}});
        }
    }

    const retry = async (form: FormInstance) => {
        try {
            await checkEmail(form.getFieldValue('email')).unwrap();
            if (form.getFieldValue('email')) {
                dispatch(setEmail({email: form.getFieldValue('email')}))
            }
            dispatch(setRetryEmail({retryEmail: false}));
            navigate(PATHS.confirmEmail, {state: {from: 'redirect'}});
        } catch (err) {
            if (err.data?.message === 'Email не найден') {
                navigate(PATHS.resultErrorNoEmailExist, {state: {from: 'redirect'}});
            } else {
                if (form.getFieldValue('email')) {
                    dispatch(setEmail({email: form.getFieldValue('email')}))
                }
                dispatch(setRetryEmail({retryEmail: true}));
                navigate(PATHS.resultErrorCheckEmail, {state: {from: 'redirect'}});
            }
        }
    }

    const handleGoogleAuth = () => {
        window.location.href = `${BASE_API_URL}${ENDPOINTS.loginGoogle}`;
    };

    return {onSubmit, retry, handleGoogleAuth};
}
