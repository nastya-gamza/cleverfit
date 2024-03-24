import {DDMMYYYY} from '@constants/date-formates.ts';
import {UploadAvatar} from '@pages/profile-page/upload-avatar/upload-avatar.tsx';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {calendarLocale} from '@utils/calendar-options.ts';
import {isValidConfirmPassword, isValidEmail, isValidPassword} from '@utils/validation.ts';
import {Button, DatePicker, Form, Grid, Input, Space, Typography} from 'antd';

import styles from './profile-page.module.less';

const {useBreakpoint} = Grid;

export const ProfilePage = () => {
    const {xs} = useBreakpoint();

    return (
        <div className={styles.contentWrapper}>
            <Form name='profile-form' size='large'>
                <Space direction='vertical' size={xs? 20 : 24} className={styles.formContainer}>
                    <Typography.Title level={5}>Личная информация</Typography.Title>

                    <div className={styles.personalInfo}>
                        <Form.Item name='imgSrc'>
                            <UploadAvatar/>
                        </Form.Item>
                        <div className={styles.personalInfoForm}>
                            <Form.Item name='firstName'>
                                <Input placeholder='Имя'/>
                            </Form.Item>
                            <Form.Item name='lastName'>
                                <Input placeholder='Фамилия'/>
                            </Form.Item>
                            <Form.Item name='birthday'>
                                <DatePicker
                                    locale={calendarLocale}
                                    format={DDMMYYYY}
                                    placeholder='Дата рождения'
                                    className={styles.datePicker}
                                    suffixIcon={<CalendarIcon fill="rgba(0, 0, 0, 0.25)"/>}
                                    data-test-id='profile-birthday'
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
                    <div>
                        <Form.Item name='email'
                                   rules={[{
                                       required: true,
                                       message: ''
                                   }, {validator: isValidEmail}]}>
                            <Input data-test-id='registration-email' addonBefore='e-mail:'/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            className={styles.password}
                            rules={[{
                                required: true,
                                message: ''
                            }, {validator: isValidPassword}]}
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        >
                            <Input.Password data-test-id='registration-password'
                                            placeholder='Пароль'/>
                        </Form.Item>
                        <Form.Item
                            name='confirm-password'
                            dependencies={['password']}
                            rules={[{required: true, message: ''}, isValidConfirmPassword]}
                        >
                            <Input.Password data-test-id='registration-confirm-password'
                                            placeholder='Повторите пароль'/>
                        </Form.Item>
                    </div>

                    <Form.Item style={{marginBottom: '16px'}}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={true}
                            data-test-id='login-submit-button'
                            block={xs}
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </div>
    )
}
