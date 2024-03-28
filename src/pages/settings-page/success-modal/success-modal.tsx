import {push} from 'redux-first-history';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {logout} from '@redux/slices/auth-slice.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {setShowSuccessModal} from '@redux/slices/settings-slice.ts';
import {Modal, Result, Typography} from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

// import styles from './success-modal.module.less';

export const SuccessModal = ({open}: {open: boolean}) => {
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();
    const {email} = useAppSelector(selectProfileInfo);

    const handleOnClose = () => {
        localStorage.removeItem('token')
        dispatch(logout());
        dispatch(push(PATHS.auth));
        dispatch(setShowSuccessModal(false));
    }

    return (
        <Modal
            open={open}
            centered={true}
            width={screens.xs ? 328 : 540}
            closable={true}
            footer={null}
            onCancel={handleOnClose}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
            data-test-id='tariff-modal-success'
        >
            <Result
                status='success'
                title='Чек для оплаты у вас на почте.'
                style={{padding: '48px 24px'}}
                subTitle={
                    <Typography.Text type='secondary'>
                        Мы отправили инструкцию для оплаты вам на e-mail
                        <span> {email} </span>.
                        После подтверждения оплаты войдите в&nbsp;приложение&nbsp;заново.
                    </Typography.Text>
                }
                extra={
                    <Typography.Text type='secondary'>
                        Не пришло письмо? Проверьте папку Спам.
                    </Typography.Text>
                }
            />
        </Modal>
    )
}
