import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useConfirmEmailMutation} from '@redux/api/auth-api.ts';
import {authSelector} from '@redux/slices/auth-slice.ts';

export const useConfirmEmail = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const {email} = useAppSelector(authSelector);
    const [confirmEmail, {isLoading, isError}] = useConfirmEmailMutation();
    const errorRef = useRef(isError);

    const handleComplete = async (confirmationCode: string) => {
        try {
            await confirmEmail({email, code: confirmationCode}).unwrap();
            navigate(PATHS.changePassword, {state: {from: 'redirect'}});
        } catch {
            errorRef.current = true;
        } finally {
            setCode('');
        }
    };

    return {code, setCode, email, handleComplete, errorRef, isLoading, isError}
}
