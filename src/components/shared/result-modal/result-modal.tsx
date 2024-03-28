import {Grid, Modal, ModalProps} from 'antd';

const {useBreakpoint} = Grid;

export const ResultModal = ({children, ...props}: ModalProps) => {
    const screens = useBreakpoint();

    return (
        <Modal
            open={true}
            centered={true}
            width={screens.xs ? 328 : 540}
            closable={true}
            footer={null}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
            {...props}
        >
            {children}
        </Modal>
    )
}
