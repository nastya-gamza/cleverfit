import {useNavigate} from 'react-router-dom';

export const useRedirectNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path, {state: {from: 'redirect'}});
    }

    return {
        handleNavigate,
    };
}
