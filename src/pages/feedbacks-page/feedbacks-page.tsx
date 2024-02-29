import {NoFeedbacks} from '@pages/feedbacks-page/components/no-feedbacks';
import {useGetFeedbacksQuery} from '@redux/api/feedback-api.ts';
import {FeedbackCard} from '@pages/feedbacks-page/components/feedback-card';
import {Loader} from '@components/loader';
import styles from './feedbacks-page.module.less';
import {Button} from 'antd';


export const FeedbacksPage = () => {
    const {data = [], isLoading, isError} = useGetFeedbacksQuery();

    if (data.length === 0) return <NoFeedbacks/>

    return (
        <>
            {isLoading && <Loader/>}
            <div className={styles.wrapper}>
                {data.map(item => <FeedbackCard key={item.id} {...item}/>)}
                <div className={styles.btnWrapper}>
                    <Button type={'primary'}>Написать отзыв</Button>
                    <Button type={'link'}>Развернуть все отзывы</Button>
                </div>
            </div>
        </>
    );
}
