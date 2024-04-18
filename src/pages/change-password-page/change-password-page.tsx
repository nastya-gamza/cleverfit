import {useEffect} from 'react';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useChangePassword} from '@pages/change-password-page/hooks/use-change-password.ts';
import {authSelector} from '@redux/slices/auth-slice.ts';
import {isValidConfirmPassword, isValidPassword} from '@utils/validation.ts';
import {Button, Card, Form, Input, Typography} from 'antd';

import styles from './change-password-page.module.less'

const {Title} = Typography;

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const {retryPassword, password} = useAppSelector(authSelector);
    const {onSubmit} = useChangePassword();

    useEffect(() => {
        if (retryPassword) {
            onSubmit(password)
        }
    }, [onSubmit, password, retryPassword]);

    return (
        <Card className={styles.card}>
            <Title level={3} style={{marginBottom: '32px'}}>Восстановление аккаунта</Title>
            <Form
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item
                    name='password'
                    rules={[isValidPassword()]}
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password data-test-id='change-password'
                                    placeholder='Новый пароль'/>
                </Form.Item>
                <Form.Item
                    name='confirmPassword'
                    dependencies={['password']}
                    rules={[{required: true, message: ''}, isValidConfirmPassword]}
                >
                    <Input.Password data-test-id='change-confirm-password'
                                    placeholder='Повторите пароль'/>
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    block={true}
                    size='large'
                    className={styles.btn}
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form>
        </Card>

    )
}
