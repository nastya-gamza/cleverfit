import {ButtonProps, Modal, Typography} from 'antd';
import {CloseCircleOutlined, CloseOutlined} from '@ant-design/icons';
import styles from './error-notification-modal.module.less';

type OkButtonPropsWithTestId = ButtonProps & {
    'data-test-id'?: string;
};

export const error = (refetch: () => void) => {
    const okButtonProps: OkButtonPropsWithTestId = {
        'data-test-id': 'modal-error-user-training-button'
    };

    Modal.error({
        title: (
            <Typography.Title data-test-id='modal-error-user-training-title' level={5}>
                При открытии данных <br/> произошла ошибка
            </Typography.Title>
        ),
        content: (
            <Typography.Text data-test-id='modal-error-user-training-subtitle' type='secondary'>
                Попробуйте еще раз
            </Typography.Text>
        ),
        centered: true,
        closable: true,
        maskStyle: {
            background: 'rgba(121, 156, 212, 0.1)',
            backdropFilter: 'blur(5px)',
        },
        width: 384,
        okText: 'Обновить',
        icon: <CloseCircleOutlined style={{color: '#2F54EBFF'}}/>,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
        className: styles.notification,
        okButtonProps: okButtonProps,
        onOk: refetch,
    });
};
