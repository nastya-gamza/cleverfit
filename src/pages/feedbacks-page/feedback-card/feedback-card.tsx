import {UserOutlined} from '@ant-design/icons';
import {DDMMYYYY} from '@constants/date-formates.ts';
import {Rating} from '@pages/feedbacks-page/rating/rating.tsx';
import {Nullable} from '@typings/nullable.ts';
import {Avatar, Card, Typography} from 'antd';
import moment from 'moment';

import styles from './feedback-card.module.less';

const {Text, Title} = Typography;

type FeedbackCardProps = {
    fullName: Nullable<string>,
    imageSrc: Nullable<string>,
    rating: number,
    message: Nullable<string>,
    createdAt: string,
}

export const FeedbackCard = ({fullName, imageSrc, message, rating, createdAt}: FeedbackCardProps) => {
    const [name, surname] = fullName?.split(' ') ?? [];
    const formattedDate = moment(createdAt).format(DDMMYYYY);

    return (
        <Card>
            <div className={styles.wrapper}>
                <div className={styles.userWrapper}>
                    <Avatar size={42} src={imageSrc} icon={<UserOutlined/>} className={styles.avatar}/>
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
