import {Dispatch, SetStateAction} from 'react';
import {Button, Divider, Form, Input, Modal, Rate} from 'antd';
import {StarOutlined} from '@ant-design/icons';
import styles from './add-feedback-modal.module.less';
import {usePostFeedbackMutation} from '@redux/api/feedback-api.ts';
import {FeedbackRequest} from '@redux/types/feedback.ts';
import {Rating} from '@pages/feedbacks-page/components/rating/rating.tsx';

type AddFeedbackModalProps = {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const AddFeedbackModal = ({showModal, setShowModal}: AddFeedbackModalProps) => {

    const [postFeedback] = usePostFeedbackMutation();

    const onFinish = async (data: FeedbackRequest) => {
        try {
            await postFeedback(data).unwrap();
            setShowModal(false)
            console.log(data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            title='Ваш отзыв'
            open={showModal}
            width={540}
            bodyStyle={{padding: 0}}
            centered
            onCancel={() => setShowModal(false)}
            maskStyle={{background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(6px)'}}
            footer={null}
        >
            <Form onFinish={onFinish} className={styles.form}>
                <Form.Item name='rating'>
                    <Rating/>
                </Form.Item>
                <Form.Item
                    name='message'
                    className={styles.formItem}
                >
                    <Input.TextArea placeholder='Autosize height based on content lines'/>
                </Form.Item>
                <Divider/>
                <Form.Item className={styles.btnRow}>
                    <Button type='primary' htmlType='submit' data-test-id='new-review-submit-button'>
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
