import React, {useEffect} from 'react';
import {GooglePlusOutlined} from '@ant-design/icons';
import {Loader} from '@components/loader';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useRegister, useRegisterFieldsValidation} from '@pages/auth-page/hooks';
import {authSelector} from '@redux/selectors/selectors.ts';
import {isValidConfirmPassword, isValidEmail, isValidPassword,} from '@utils/validation.ts';
import {Button, Form, Grid, Input} from 'antd';

import styles from './register-form.module.less';

const {useBreakpoint} = Grid;

export const RegisterForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const {retryRegister, credentials} = useAppSelector(authSelector);
    const {onSubmit, isLoading} = useRegister();
    const {isDisabled, validateFields} = useRegisterFieldsValidation(form);

    useEffect(() => {
        if (retryRegister) {
            onSubmit(credentials);
        }
    }, [credentials, onSubmit, retryRegister]);

    return (
        <React.Fragment>
            {isLoading && <Loader/>}
            <Form
                form={form}
                name='register'
                autoComplete='off'
                size='large'
                className={styles.form}
                onFieldsChange={validateFields}
                onFinish={onSubmit}
            >
                <Form.Item name='email'
                           rules={[{required: true, message: ''}, {validator: isValidEmail}]}>
                    <Input data-test-id='registration-email' addonBefore='e-mail:'/>
                </Form.Item>
                <Form.Item
                    name='password'
                    className={styles.password}
                    rules={[{required: true, message: ''}, {validator: isValidPassword}]}
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password data-test-id='registration-password' placeholder='Пароль'/>
                </Form.Item>
                <Form.Item
                    name='confirm-password'
                    dependencies={['password']}
                    rules={[{required: true, message: ''}, isValidConfirmPassword]}
                >
                    <Input.Password data-test-id='registration-confirm-password'
                                    placeholder='Повторите пароль'/>
                </Form.Item>
                <div className={styles.btnWrapper}>
                    <Button
                        type='primary'
                        disabled={isDisabled}
                        className={styles.btn}
                        htmlType='submit'
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                    <Button className={styles.btn}>
                        {screens.xs ? '' : <GooglePlusOutlined/>} Регистрация через Google
                    </Button>
                </div>
            </Form>
        </React.Fragment>
    )
}
