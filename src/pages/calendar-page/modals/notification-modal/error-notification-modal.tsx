import {ReactNode} from 'react';
import {Modal, Typography} from 'antd';
import {CloseCircleOutlined, CloseOutlined} from '@ant-design/icons';
import styles from './error-notification-modal.module.less';


export const error = (title: ReactNode,
                      content: string,
                      btnText: string,
                      onClick: () => void,
                      isOnSave = false,
) => {
    Modal.error({
        title: (
            <Typography.Title data-test-id='modal-error-user-training-title' level={5}>
                {title}
            </Typography.Title>
        ),
        content: (
            <Typography.Text data-test-id='modal-error-user-training-subtitle' type='secondary'>
                {content}
            </Typography.Text>
        ),
        centered: true,
        closable: !isOnSave,
        maskStyle: {
            background: 'rgba(121, 156, 212, 0.1)',
            backdropFilter: 'blur(5px)',
        },
        okText: <span data-test-id='modal-error-user-training-button'>{btnText}</span>,
        icon: <CloseCircleOutlined style={{color: isOnSave ? '#FF4D4F' : '#2F54EBFF'}}/>,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close'/>,
        className: styles.notification,
        onOk: onClick,
    });
};
