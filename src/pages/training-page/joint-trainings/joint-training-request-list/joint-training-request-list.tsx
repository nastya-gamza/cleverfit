import {Dispatch, SetStateAction, useState} from 'react';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {
    JointTrainingRequestCard
} from '@pages/training-page/joint-trainings/joint-training-request-card';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {Button, Typography} from 'antd';

import styles from './joint-training-request-list.module.less';

type JointTrainingRequestListProps = {
    showMyPartners: Dispatch<SetStateAction<boolean>>;
}

export const JointTrainingRequestList = ({showMyPartners}: JointTrainingRequestListProps) => {
    const [showAllInvitations, setShowAllInvitations] = useState(false);
    const {invitationList} = useAppSelector(selectUserJointTrainings);

    const list = showAllInvitations ? invitationList : [invitationList[0]];
    const invitationsCount = invitationList.length;

    const handleToggleShowAll = () => setShowAllInvitations(!showAllInvitations);

    return (
        <div className={styles.container}>
            <Typography.Text type='secondary'>
                Новое сообщение ({invitationsCount})
            </Typography.Text>
            {list.map(({_id, from, training}) =>
                <JointTrainingRequestCard
                    key={_id}
                    id={_id}
                    from={from}
                    training={training}
                    showMyPartners={showMyPartners}
                />
            )}
            {
                invitationsCount > 1 && (
                    <Button
                        type='link'
                        onClick={handleToggleShowAll}
                        icon={showAllInvitations ? <UpOutlined/> : <DownOutlined/>}
                    >
                        {showAllInvitations ?
                            'Скрыть все сообщения' :
                            'Показать все сообщения'
                        }
                    </Button>
                )
            }
        </div>
    )
}
