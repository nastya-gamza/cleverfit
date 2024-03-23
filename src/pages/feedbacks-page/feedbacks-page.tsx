import React, {useState} from 'react';
import {Loader} from '@components/loader';
import {ErrorModal} from '@components/shared/error-modal';
import {FeedbackCard} from '@pages/feedbacks-page/feedback-card';
import {AddFeedbackModal} from '@pages/feedbacks-page/modals';
import {NoFeedbacks} from '@pages/feedbacks-page/no-feedbacks';
import {useGetFeedbacksQuery} from '@redux/api/feedback-api.ts';
import {sortByDate} from '@utils/sort.ts';
import {Button} from 'antd';

import styles from './feedbacks-page.module.less';

export const FeedbacksPage = () => {
    const [showAllFeedbacks, setShowAllFeedBacks] = useState(false);
    const [showAddFeedbackModal, setShowAddFeedbackModal] = useState(false);
    const {data = [], isLoading, isError} = useGetFeedbacksQuery();

    const isDataEmpty = data.length === 0;

    const getAllFeedbacks = (count = 4) => {
        const sortedFeedbacks = sortByDate(data);

        return showAllFeedbacks ? sortedFeedbacks : sortedFeedbacks.slice(0, count);
    }

    const handleShowAllFeedbacks = () => {
        setShowAllFeedBacks(!showAllFeedbacks)
    }

    const handleShowAddFeedbackModal = () => {
        setShowAddFeedbackModal(true)
    }

    return (
        <React.Fragment>
            {isLoading && <Loader/>}
            {isError && <ErrorModal/>}
            <AddFeedbackModal
                showFeedbackModal={showAddFeedbackModal}
                setShowFeedbackModal={setShowAddFeedbackModal}
            />
            {isDataEmpty ?
                <NoFeedbacks/>
                :
                <div className={styles.wrapper}>
                    <div className={styles.cardsWrapper}>
                        {getAllFeedbacks().map(item => <FeedbackCard key={item._id} {...item}/>)}
                    </div>
                    <div className={styles.btnWrapper}>
                        <Button
                            type='primary'
                            onClick={handleShowAddFeedbackModal}
                            data-test-id='write-review'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            onClick={handleShowAllFeedbacks}
                            data-test-id='all-reviews-button'
                        >
                            {showAllFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}
