import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {Button, Result} from 'antd';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleNavigateMain = () => {
        navigate(PATHS.main)
    }

    return (
        <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
                <Button type='primary' onClick={handleNavigateMain}>
                    Вернуться на главную страницу
                </Button>}
        />
    )
};
