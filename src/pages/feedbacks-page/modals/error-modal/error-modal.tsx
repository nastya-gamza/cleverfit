import {useNavigate} from 'react-router-dom';
import {Button, Grid, Modal, Result} from 'antd';
import {PATHS} from '@constants/paths.ts';
import styles from './error-modal.module.less';

const {useBreakpoint} = Grid;

export const ErrorModal = () => {
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const handleClose = () => {
        navigate(PATHS.main)
    }

    return (
        <Modal
            open
            centered
            width={screens.xs ? 328 : 540}
            closable={false}
            footer={null}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
        >
            <Result
                status='500'
                title='Что-то пошло не так.'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={<Button type='primary' onClick={handleClose}>Назад</Button>}
                className={styles.result}
            />
        </Modal>
    )
}
