import {useEffect} from 'react';
import {Button, Card, Form, Input, Typography} from 'antd';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {isValidConfirmPassword, isValidPassword} from '@utils/validation.ts';
import {useChangePassword} from '@pages/change-password-page/hooks/use-change-password.ts';
import {Loader} from '@components/loader';
import styles from './change-password-page.module.less'

const {Title} = Typography;

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const {retryPassword, password} = useAppSelector(authSelector);
    const {onSubmit, isLoading} = useChangePassword();

    useEffect(() => {
        if (retryPassword) {
            onSubmit(password)
        }
    }, [onSubmit, password, retryPassword]);

    return (
        <>
            {isLoading && <Loader/>}
            <Card className={styles.card}>
                <Title level={3} style={{marginBottom: '32px'}}>Восстановление аккаунта</Title>
                <Form
                    form={form}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name='password'
                        className={styles.password}
                        rules={[{required: true, message: ''}, {validator: isValidPassword}]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password data-test-id='change-password'
                                        placeholder={'Новый пароль'}/>
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        className={styles.password}
                        rules={[{required: true, message: ''}, isValidConfirmPassword]}
                    >
                        <Input.Password data-test-id='change-confirm-password'
                                        placeholder={'Повторите пароль'}/>
                    </Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block
                        size='large'
                        className={styles.btn}
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form>
            </Card>
        </>

    )
}
