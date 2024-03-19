import {useNavigate} from 'react-router-dom';
import {Button, Grid, Modal, Result} from 'antd';
import {PATHS} from '@constants/paths.ts';
import styles from './error-modal.module.less';
import {HTTP_STATUSES} from '@constants/http-statuses.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {setIsError} from '@redux/slices/app-slice.ts';

const {useBreakpoint} = Grid;

export const ErrorModal = () => {
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();

    const handleClose = () => {
        navigate(PATHS.main);
        dispatch(setIsError(false))
    }

    return (
        <Modal
            open
            centered
            width={screens.xs ? 328 : 540}
            closable={false}
            footer={null}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
            data-test-id='modal-no-review'
        >
            <Result
                status={HTTP_STATUSES.serverError}
                title='Что-то пошло не так.'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={<Button type='primary' size='large' onClick={handleClose}>Назад</Button>}
                className={styles.result}
            />
        </Modal>
    )
}
