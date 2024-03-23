import {useNavigate, useParams} from 'react-router-dom';
import {AuthResults, ResultStatuses} from '@constants/auth-statuses.ts';
import {Button, Card, Result} from 'antd';

import styles from './result-page.module.less';

export const ResultPage = () => {
    const {type} = useParams() as { type: ResultStatuses };
    const navigate = useNavigate();
    const {status, title, subTitle, buttonText, redirectTo, buttonTestId} = AuthResults[type];

    const handleClick = () => {
        navigate(redirectTo);
    }

    return (
        <Card className={styles.result}>
            <Result status={status} title={title} subTitle={subTitle}
                    extra={[
                        <Button onClick={handleClick} data-test-id={buttonTestId} size='large'
                                block={status !== 500} type='primary'>
                            {buttonText}
                        </Button>,
                    ]}/>
        </Card>
    );
}
