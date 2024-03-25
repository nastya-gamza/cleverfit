import React, {useEffect, useState} from 'react';
import {DDMMYYYY} from '@constants/date-formates.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {FormFields} from '@pages/auth-page/hooks/use-auth.ts';
import {UploadAvatar} from '@pages/profile-page/upload-avatar/upload-avatar.tsx';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {useUpdateCurrentUserMutation} from '@redux/api/profile-api.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {isValidConfirmPassword, isValidEmail, isValidPassword} from '@utils/validation.ts';
import {Button, DatePicker, Form, Grid, Input, Space, Typography, Alert} from 'antd';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';

import styles from './profile-page.module.less';
import moment from 'moment';
import {Simulate} from 'react-dom/test-utils';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';

const {useBreakpoint} = Grid;

export const ProfilePage = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const {xs} = useBreakpoint();
    const {email, firstName, lastName, imgSrc, birthday} = useAppSelector(selectProfileInfo);

    const [updateUser, {isSuccess, isError}] = useUpdateCurrentUserMutation();

    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    const handleFormChange = () => {
        setIsDisabled(false);
    }

    const onSubmit = (data: FormFields) => {
        updateUser({...data, imgSrc});
    }

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessModal(true);
            setIsDisabled(true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            error(
                'При сохранении данных произошла ошибка',
                'Придется попробовать еще раз',
                'Закрыть',
                () => navigate(PATHS.profile, {state: {from: 'redirect'}}),
                'big-file-error-close',
                true,
            );
        }
    }, [isError]);

    return (
        <React.Fragment>
            {showSuccessModal &&
                <Alert
                    message="Данные профиля успешно обновлены"
                    type="success"
                    showIcon={true}
                    closable={true}
                    className={styles.alert}
                    data-test-id='alert'
                    onClose={() => setShowSuccessModal(false)}
                />}
            <div className={styles.contentWrapper}>
                <Form
                    form={form}
                    name='profile-form'
                    size='large'
                    onChange={handleFormChange}
                    onFinish={onSubmit}>
                    <Space direction='vertical' size={xs ? 20 : 24}
                           className={styles.formContainer}>
                        <Typography.Title level={5}>Личная информация</Typography.Title>

                        <div className={styles.personalInfo}>
                            <Form.Item name='avatar' data-test-id='profile-avatar'>
                                <UploadAvatar url={imgSrc} setIsDisabled={setIsDisabled}/>
                            </Form.Item>
                            <div className={styles.personalInfoForm}>
                                <Form.Item name='firstName' initialValue={firstName}>
                                    <Input placeholder='Имя' data-test-id='profile-name'/>
                                </Form.Item>
                                <Form.Item name='lastName' initialValue={lastName}>
                                    <Input placeholder='Фамилия' data-test-id='profile-surname'/>
                                </Form.Item>
                                <Form.Item name='birthday'>
                                    <DatePicker
                                        locale={calendarLocale}
                                        format={DDMMYYYY}
                                        placeholder='Дата рождения'
                                        defaultValue={birthday ? moment(birthday) : undefined}
                                        className={styles.datePicker}
                                        suffixIcon={<CalendarIcon fill="rgba(0, 0, 0, 0.25)"/>}
                                        data-test-id='profile-birthday'
                                        onChange={()=>setIsDisabled(false)}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
                        <div>
                            <Form.Item name='email' initialValue={email}
                                       rules={[{
                                           required: true,
                                           message: ''
                                       }, {validator: isValidEmail}]}>
                                <Input data-test-id='profile-email' addonBefore='e-mail:'/>
                            </Form.Item>
                            <Form.Item
                                name='password'
                                className={styles.password}
                                rules={[isValidPassword(false)]}
                                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            >
                                <Input.Password data-test-id='profile-password'
                                                placeholder='Пароль'/>
                            </Form.Item>
                            <Form.Item
                                name='confirm-password'
                                dependencies={['password']}
                                rules={[{
                                    required: form?.getFieldValue('password'),
                                    message: ''
                                }, isValidConfirmPassword]}
                            >
                                <Input.Password data-test-id='profile-repeat-password'
                                                placeholder='Повторите пароль'/>
                            </Form.Item>
                        </div>

                        <Form.Item style={{marginBottom: '16px'}}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={isDisabled}
                                data-test-id='profile-submit'
                                block={xs}
                            >
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </div>
        </React.Fragment>
    )
}
