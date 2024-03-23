import {useState} from 'react';
import {AddFeedbackModal} from '@pages/feedbacks-page/modals';
import {Button, Card, Typography} from 'antd';

import styles from './no-feedbacks.module.less';

const {Title, Text} = Typography;

export const NoFeedbacks = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <Title level={3} className={styles.title}>Оставьте свой отзыв первым</Title>
                <Text type='secondary' className={styles.text}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и&nbsp;помогите им сделать
                    правильный выбор.
                </Text>
            </Card>
            <Button
                type='primary'
                onClick={showModal}
                className={styles.btn}
                data-test-id='write-review'
            >
                Написать отзыв
            </Button>
            <AddFeedbackModal showFeedbackModal={open} setShowFeedbackModal={setOpen}/>
        </div>
    )
}
