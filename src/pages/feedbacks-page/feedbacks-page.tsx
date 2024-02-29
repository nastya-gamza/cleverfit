import {NoFeedbacks} from '@pages/feedbacks-page/components/no-feedbacks';
import {Feedback, useGetFeedbacksQuery} from '@redux/api/feedback-api.ts';
import {FeedbackCard} from '@pages/feedbacks-page/components/feedback-card';
import {Loader} from '@components/loader';
import styles from './feedbacks-page.module.less';
import {Button} from 'antd';
import {ErrorModal} from '@pages/feedbacks-page/components/error-modal';
import {useState} from 'react';


export const FeedbacksPage = () => {
    const [showAllFeedbacks, setShowAllFeedBacks] = useState(false);
    const {data = [], isLoading, isError} = useGetFeedbacksQuery();

    function getFeedbacks(items: Feedback[], count = 4) {
        return showAllFeedbacks ? items : items.slice(0, count);
    }

    const handleShowAllFeedbacks = () => {
        setShowAllFeedBacks(!showAllFeedbacks)
    }

    return (
        <>
            {data.length === 0 && <NoFeedbacks/>}
            {isLoading && <Loader/>}
            {isError && <ErrorModal/>}

            <div className={styles.wrapper}>
                {getFeedbacks(data).map(item => <FeedbackCard key={item.id} {...item}/>)}
                <div className={styles.btnWrapper}>
                    <Button type={'primary'}>Написать отзыв</Button>
                    <Button type={'link'} onClick={handleShowAllFeedbacks}>
                        {showAllFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                    </Button>
                </div>
            </div>
        </>
    );
}
