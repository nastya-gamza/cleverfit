import {UserOutlined} from '@ant-design/icons';
import {Rating} from '@pages/feedbacks-page/rating/rating.tsx';
import {Avatar, Card, Typography} from 'antd';
import moment from 'moment';

import styles from './feedback-card.module.less';

const {Text, Title} = Typography;

type FeedbackCardProps = {
    fullName: string | null,
    image: string | null,
    rating: number,
    message: string | null,
    createdAt: string,
}

export const FeedbackCard = ({fullName, image, message, rating, createdAt}: FeedbackCardProps) => {
    const [name, surname] = fullName?.split(' ') ?? [];
    const formattedDate = moment(createdAt).format('DD.MM.YYYY');

    return (
        <Card>
            <div className={styles.wrapper}>
                <div className={styles.userWrapper}>
                    <Avatar size={42} icon={image || <UserOutlined/>} className={styles.avatar}/>
                    <div>
                        <Title level={5}>{name || 'Пользователь'}</Title>
                        <Title level={5}>{surname}</Title>
                    </div>
                </div>
                <div className={styles.feedbackWrapper}>
                    <div className={styles.rating}>
                        <Rating value={rating} disabled={true}/>
                        <Text className={styles.date}>{formattedDate}</Text>
                    </div>
                    <Text type='secondary'>{message}</Text>
                </div>
            </div>
        </Card>
    )
}
