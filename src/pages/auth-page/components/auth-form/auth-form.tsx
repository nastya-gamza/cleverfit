import {useEffect} from 'react';
import {Button, Checkbox, Form, Grid, Input} from 'antd';
import {isValidEmail, isValidPassword} from '@utils/validation.ts';
import {authSelector} from '@redux/selectors/selectors.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useAuth, useEmailValidation} from '@pages/auth-page/hooks';
import {Loader} from '@components/loader';
import {GooglePlusOutlined} from '@ant-design/icons';
import styles from './auth-form.module.less';

const {useBreakpoint} = Grid;

export const AuthForm = () => {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const {retryEmail} = useAppSelector(authSelector);
    const {onSubmit, retry, isLoginLoading, isCheckEmailLoading} = useAuth();
    const {isEmailValid, validateEmail} = useEmailValidation(form);

    const handleChangePassword = async () => {
        if (validateEmail()) {
            await retry(form)
        }
    }

    useEffect(() => {
        if (retryEmail) {
            retry(form);
        }
    }, [form, retry, retryEmail]);

    return (
        <>
            {(isCheckEmailLoading || isLoginLoading) && <Loader/>}
            <Form
                name='auth'
                form={form}
                autoComplete='on'
                className={styles.form}
                onFinish={onSubmit}
                onFieldsChange={(changedFields) => {
                    const emailField = changedFields.find((field) => field.name.includes('email'));
                    if (emailField) validateEmail();
                }}
            >
                <Form.Item name='email'
                           rules={[{required: true, message: ''}, {validator: isValidEmail}]}
                           validateStatus={isEmailValid ? 'success' : 'error'}>
                    <Input data-test-id='login-email'
                           addonBefore='e-mail:' className={styles.email}/>
                </Form.Item>
                <Form.Item name='password'
                           rules={[{required: true, message: ''}, {validator: isValidPassword}]}>
                    <Input.Password data-test-id='login-password'
                                    placeholder='Пароль'/>
                </Form.Item>
                <div className={styles.row}>
                    <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox data-test-id='login-remember' checked={true}>Запомнить
                            меня</Checkbox>
                    </Form.Item>
                    <Form.Item className={styles.link}>
                        <Button
                            disabled={!isEmailValid}
                            onClick={handleChangePassword}
                            data-test-id='login-forgot-button' type='link'
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>
                </div>
                <Form.Item style={{marginBottom: '16px'}}>
                    <Button
                        type='primary'
                        className={styles.btn}
                        htmlType='submit'
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button className={styles.btn}>
                        {screens.xs ? '' : <GooglePlusOutlined/>} Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>)
}
