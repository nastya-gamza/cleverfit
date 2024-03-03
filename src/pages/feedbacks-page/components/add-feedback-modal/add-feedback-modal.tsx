import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Modal} from 'antd';
import {usePostFeedbackMutation} from '@redux/api/feedback-api.ts';
import {FeedbackRequest} from '@redux/types/feedback.ts';
import {Rating} from '@pages/feedbacks-page/components/rating/rating.tsx';
import {ResultModal} from '@pages/feedbacks-page/components/result-modal/result-modal.tsx';
import {Loader} from '@components/loader';
import styles from './add-feedback-modal.module.less';

type AddFeedbackModalProps = {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

type Result = 'success' | 'error'

export const AddFeedbackModal = ({showModal, setShowModal}: AddFeedbackModalProps) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState<Result | null>(null)
    const [isDisabled, setIsDisabled] = useState(true);
    const [openResultModal, setOpenResultModal] = useState(false);
    const [postFeedback, {isLoading, isError, isSuccess}] = usePostFeedbackMutation();

    const onValuesChange = (_, allValues: FeedbackRequest) => {
        if (allValues.rating > 0) {
            setIsDisabled(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setOpenResultModal(true);
            setResult('success');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setOpenResultModal(true);
            setResult('error')
        }
    }, [isError]);

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    };

    const onFinish = (data: FeedbackRequest) => {
        postFeedback(data);
        form.resetFields();
        setShowModal(false);
    }

    return (
        <>
            {isLoading && <Loader/>}
            <Modal
                title='Ваш отзыв'
                open={showModal}
                width={540}
                bodyStyle={{padding: 0}}
                centered
                onCancel={handleCancel}
                maskStyle={{background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(6px)'}}
                footer={null}
            >
                <Form onFinish={onFinish} form={form} onValuesChange={onValuesChange}
                      className={styles.form}>
                    <Form.Item name='rating' required>
                        <Rating/>
                    </Form.Item>
                    <Form.Item name='message' className={styles.formItem}>
                        <Input.TextArea
                            placeholder='Autosize height based on content lines'/>
                    </Form.Item>
                    <Divider/>
                    <Form.Item className={styles.btnRow}>
                        <Button
                            type='primary'
                            disabled={isDisabled}
                            htmlType='submit'
                            data-test-id='new-review-submit-button'
                        >
                            Опубликовать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <ResultModal
                result={result}
                open={openResultModal}
                setOpen={setOpenResultModal}
                setOpenAddNewFeedback={setShowModal}/>
        </>
    )
}
