import {Dispatch, SetStateAction} from 'react';
import {RESULTS} from '@constants/results.ts';
import {Button, Grid, Modal, Result} from 'antd';

import styles from './result-modal.module.less';

type SuccessModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setOpenAddFeedback: Dispatch<SetStateAction<boolean>>;
    result: string | null;
};

const {useBreakpoint} = Grid;

export const ResultModal = ({open, setOpen, setOpenAddFeedback, result}: SuccessModalProps) => {
    const screens = useBreakpoint();

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAddFeedback = () => {
        setOpenAddFeedback(true)
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            closable={false}
            centered={true}
            width={screens.xs ? 328 : 540}
            maskStyle={{background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)'}}
            className={styles.modal}
            footer={null}
        >
            {result === RESULTS.success ?
                <Result
                    status={RESULTS.success}
                    title='Отзыв успешно опубликован'
                    className={styles.result}
                    extra={
                        <Button type='primary' onClick={handleCancel} block={true}>
                            Отлично
                        </Button>
                    }
                />
                :
                <Result
                    status={RESULTS.error}
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    className={styles.result}
                    extra={[
                        <div className={styles.btnRow}>
                            <Button
                                type='primary'
                                onClick={handleAddFeedback}
                                data-test-id='write-review-not-saved-modal'
                            >
                                Написать отзыв
                            </Button>
                            <Button onClick={handleCancel}>Закрыть</Button>
                        </div>
                    ]}
                />
            }
        </Modal>
    );
}
