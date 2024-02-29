import {Button, Modal, Result} from 'antd';
import styles from './error-modal.module.less';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';

export const ErrorModal = () => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(PATHS.main)
    }

    return (
        <Modal open
               centered
               closable={false}
               footer={null}
               maskStyle={{ background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)' }}
               width={540}
        >
            <Result
                status='500'
                title='Что-то пошло не так.'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={
                <Button type='primary' onClick={handleClose}>Назад</Button>
            }
                className={styles.result}
            />
        </Modal>
    )
}
