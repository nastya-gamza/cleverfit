import {useState} from 'react';
import {Button} from 'antd';
import {Feedback, useGetFeedbacksQuery} from '@redux/api/feedback-api.ts';
import {NoFeedbacks} from '@pages/feedbacks-page/components/no-feedbacks';
import {FeedbackCard} from '@pages/feedbacks-page/components/feedback-card';
import {ErrorModal} from '@pages/feedbacks-page/components/error-modal';
import {AddFeedbackModal} from '@pages/feedbacks-page/components/add-feedback-modal';
import {Loader} from '@components/loader';
import styles from './feedbacks-page.module.less';


export const FeedbacksPage = () => {
    const [showAllFeedbacks, setShowAllFeedBacks] = useState(false);
    const [showAddFeedbackModal, setShowAddFeedbackModal] = useState(false);
    const {data = [], isLoading, isError} = useGetFeedbacksQuery();

    const sortByDate = () => {
        return data.toSorted((a: Feedback, b: Feedback) => +new Date(b.createdAt) - +new Date(a.createdAt))
    }

    function getFeedbacks(items: Feedback[], count = 4) {
        return showAllFeedbacks ? items : items.slice(0, count);
    }

    const handleShowAllFeedbacks = () => {
        setShowAllFeedBacks(!showAllFeedbacks)
    }

    const handleShowAddFeedbackModal = () => {
        setShowAddFeedbackModal(true)
    }

    return (
        <>

            {isLoading && <Loader/>}
            {isError && <ErrorModal/>}
            {showAddFeedbackModal && <AddFeedbackModal showModal={showAddFeedbackModal}
                                                       setShowModal={setShowAddFeedbackModal}/>}
            {data.length === 0 ?
                <NoFeedbacks/>
                :
                <div className={styles.wrapper}>
                    <div className={styles.cardsWrapper}>
                        {getFeedbacks(sortByDate()).map(item => <FeedbackCard
                            key={item.id} {...item}/>)}
                    </div>

                </div>
            }
            <div className={styles.btnWrapper}>
                <Button type={'primary'} onClick={handleShowAddFeedbackModal}
                        data-test-id='write-review'>
                    Написать отзыв
                </Button>
                {data.length !== 0 && <Button type={'link'} onClick={handleShowAllFeedbacks}
                                              data-test-id='all-reviews-button'>
                    {showAllFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>}
            </div>

        </>
    );
}
