import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {RESULTS} from '@constants/results.ts';
import {ResultModal} from '@pages/feedbacks-page/modals';
import {Rating} from '@pages/feedbacks-page/rating/rating.tsx';
import {usePostFeedbackMutation} from '@redux/api/feedback-api.ts';
import {FeedbackRequest} from '@redux/types/feedback.ts';
import {Button, Divider, Form, Input, Modal} from 'antd';

import styles from './add-feedback-modal.module.less';

type AddFeedbackModalProps = {
    showFeedbackModal: boolean,
    setShowFeedbackModal: Dispatch<SetStateAction<boolean>>;
}

type Result = 'success' | 'error';

export const AddFeedbackModal = ({showFeedbackModal, setShowFeedbackModal}: AddFeedbackModalProps) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState<Result | null>(null)
    const [isDisabled, setIsDisabled] = useState(true);
    const [openResultModal, setOpenResultModal] = useState(false);
    const [postFeedback, {isError, isSuccess}] = usePostFeedbackMutation();

    useEffect(() => {
        if (isSuccess) {
            setOpenResultModal(true);
            setResult(RESULTS.success);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setOpenResultModal(true);
            setResult(RESULTS.error);
        }
    }, [isError]);

    const handleCancel = () => {
        setShowFeedbackModal(false);
        form.resetFields();
    };

    const onSubmit = (data: FeedbackRequest) => {
        postFeedback(data);
        form.resetFields();
        setShowFeedbackModal(false);
    }

    const onValuesChange = (_, allValues: FeedbackRequest) => {
        if (allValues.rating > 0) {
            setIsDisabled(false);
        }
    };

    return (
        <React.Fragment>
            <Modal
                open={showFeedbackModal}
                title='Ваш отзыв'
                width={540}
                centered={true}
                bodyStyle={{padding: 0}}
                onCancel={handleCancel}
                maskStyle={{background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(6px)'}}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={onSubmit}
                    onValuesChange={onValuesChange}
                    className={styles.form}>
                    <Form.Item name='rating' required={true}>
                        <Rating/>
                    </Form.Item>
                    <Form.Item name='message'>
                        <Input.TextArea className={styles.textarea}
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
                setOpenAddFeedback={setShowFeedbackModal}/>
        </React.Fragment>
    )
}
