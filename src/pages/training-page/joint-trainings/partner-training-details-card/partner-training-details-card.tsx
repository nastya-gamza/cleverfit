import {CloseOutlined} from '@ant-design/icons';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {Exercise} from '@redux/types/training.ts';
import {Nullable} from '@typings/nullable.ts';
import {getPeriodicityLabel} from '@utils/get-periodicity-label.ts';
import {Button, Card, Typography} from 'antd';

import styles from './partner-training-details-card.module.less';

type PartnerTrainingDetailsCardProps = {
    date: string;
    trainingName: string;
    close: () => void;
    period: Nullable<number> | undefined,
    exercises: Exercise[],
}

export const PartnerTrainingDetailsCard = ({
                                               date,
                                               trainingName,
                                               exercises,
                                               period,
                                               close
                                           }: PartnerTrainingDetailsCardProps) => {

    const exerciseDetails = exercises.map((e, i) => (
        <div className={styles.exerciseRow} key={i}>
            <Typography.Text type='secondary'>{e.name}</Typography.Text>
            <Typography.Text className={styles.exerciseData}>
                {e.approaches} х ({e.weight} кг)
            </Typography.Text>
        </div>
    ));

    return (
        <Card
            title={<TrainingBadge training={trainingName}/>}
            extra={
                <Button
                    type='text'
                    icon={<CloseOutlined/>}
                    onClick={close}
                />
            }
            className={styles.card}
            data-test-id='joint-training-review-card'
        >
            <div>
                <div className={styles.dateInfo}>
                    <Typography.Text className={styles.periodicity}>
                        {getPeriodicityLabel(period)}
                    </Typography.Text>
                    <Typography.Text>{date}</Typography.Text>
                </div>
                <div className={styles.exercises}>
                    {exerciseDetails}
                </div>
            </div>
        </Card>
    )
}
