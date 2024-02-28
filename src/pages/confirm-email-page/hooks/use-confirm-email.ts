import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useConfirmEmailMutation} from '@redux/api/auth-api.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PATHS} from '@constants/paths.ts';

export const useConfirmEmail = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const {email} = useAppSelector(authSelector);
    const [confirmEmail, {isLoading, isError}] = useConfirmEmailMutation();
    const errorRef = useRef(isError);

    const handleComplete = async (code: string) => {
        try {
            await confirmEmail({email, code}).unwrap();
            navigate(PATHS.changePassword, {state: {from: 'redirect'}});
        } catch (e) {
            errorRef.current = true;
        } finally {
            setCode('');
        }
    };

    return {code, setCode, email, handleComplete, errorRef, isLoading, isError}
}
