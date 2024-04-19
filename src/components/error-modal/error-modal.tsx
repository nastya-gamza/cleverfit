import {useNavigate} from 'react-router-dom';
import {HttpStatuses} from '@constants/http-statuses.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {setIsError} from '@redux/slices/app-slice.ts';
import {Button, Grid, Modal, ModalProps, Result} from 'antd';

import styles from './error-modal.module.less';

const {useBreakpoint} = Grid;

export const ErrorModal = ({...props}: ModalProps) => {
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();

    const handleClose = () => {
        navigate(PATHS.main);
        dispatch(setIsError(false))
    }

    return (
        <Modal
            open={true}
            centered={true}
            width={screens.xs ? 328 : 540}
            closable={false}
            footer={null}
            onCancel={handleClose}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
            data-test-id='modal-no-review'
            {...props}
        >
            <Result
                status={HttpStatuses.serverError}
                title='Что-то пошло не так.'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={<Button type='primary' size='large' onClick={handleClose}>Назад</Button>}
                className={styles.result}
            />
        </Modal>
    )
}
