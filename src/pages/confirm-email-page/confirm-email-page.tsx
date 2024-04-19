import VerificationInput from 'react-verification-input';
import {useConfirmEmail} from '@pages/confirm-email-page/hooks/use-confirm-email.ts';
import {Card, Result} from 'antd';
import classnames from 'classnames';

import styles from './confirm-email-page.module.less'

export const ConfirmEmailPage = () => {
    const {code, setCode, email, handleComplete, errorRef} = useConfirmEmail();

    return (
        <Card className={styles.card}>
            <Result className={styles.result}
                    status={errorRef.current ? 'error' : 'info'}
                    title={
                        <div>
                            {errorRef.current ? 'Неверный код. ' : ''}
                            Введите код <br/> для восстановления аккаунта
                        </div>
                    }
                    subTitle={
                        <div>
                            Мы отправили вам на e-mail
                            <span className={styles.email}>{email}</span><br/>
                            шестизначный код. Введите его в поле ниже.
                        </div>
                    }
            />
            <VerificationInput
                placeholder=''
                validChars='0-9'
                value={code}
                onChange={setCode}
                onComplete={handleComplete}
                inputProps={{'data-test-id': 'verification-input'}}
                classNames={{
                    container: styles.wrapper,
                    character: classnames(
                        'ant-input',
                        errorRef.current && 'ant-input-status-error',
                        styles.input,
                    ),
                }}
            />
            <p className={styles.note}>Не пришло письмо? Проверьте папку Спам.</p>
        </Card>
    );
};
