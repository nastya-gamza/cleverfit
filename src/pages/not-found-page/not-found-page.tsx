import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {Button, Result} from 'antd';
import {HttpStatuses} from '@constants/http-statuses.ts';

import styles from './not-found-page.module.less';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleNavigateMain = () => {
        navigate(PATHS.main)
    }

    return (
        <Result
            status={HttpStatuses.notFound}
            title='Такой страницы нет'
            subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
            className={styles.container}
            extra={
                <Button
                    type='primary'
                    onClick={handleNavigateMain}
                    size='large'
                >
                    На главную страницу
                </Button>}
        />
    )
};
