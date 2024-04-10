import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {DDMMYYYY} from '@constants/date-formates.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {FormFields} from '@pages/auth-page/hooks/use-auth.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {UploadAvatar} from '@pages/profile-page/upload-avatar';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {useUpdateCurrentUserMutation} from '@redux/api/profile-api.ts';
import {setAlert} from '@redux/slices/app-slice.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {isValidConfirmPassword, isValidEmail, isValidPassword} from '@utils/validation.ts';
import {Button, DatePicker, Form, Grid, Input, Space, Typography} from 'antd';
import moment from 'moment/moment';

import styles from './profile-form.module.less';

const {useBreakpoint} = Grid;

export const ProfileForm = () => {
    const {xs} = useBreakpoint();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {email, firstName, lastName, imgSrc, birthday} = useAppSelector(selectProfileInfo);
    const [updateUser, {isSuccess, isError}] = useUpdateCurrentUserMutation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleFormChange = () => {
        setIsDisabled(false);
    }

    const onSubmit = (data: FormFields) => {
        updateUser({...data, imgSrc});
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAlert({
                type: 'success',
                message: 'Данные профиля успешно обновлены',
                dataTestId: 'alert'
            }));
            form.resetFields(['password', 'confirm-password']);
            setIsDisabled(true);
        }
    }, [isSuccess, form]);

    useEffect(() => {
        if (isError) {
            error(
                'При сохранении данных произошла ошибка',
                'Придется попробовать еще раз',
                'Закрыть',
                () => navigate(PATHS.profile, {state: {from: 'redirect'}}),
                '',
                true,
            );
        }
    }, [isError]);

    return (
        <div className={styles.contentWrapper}>
            <Form
                form={form}
                name='profile-form'
                size='large'
                onChange={handleFormChange}
                onFinish={onSubmit}>
                <Space
                    direction='vertical'
                    size={xs ? 20 : 24}
                    className={styles.formContainer}
                >
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
                                    suffixIcon={<CalendarIcon fill='rgba(0, 0, 0, 0.25)'/>}
                                    data-test-id='profile-birthday'
                                    onChange={() => setIsDisabled(false)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
                    <div>
                        <Form.Item
                            name='email'
                            initialValue={email}
                            rules={[{validator: isValidEmail}]}>
                            <Input data-test-id='profile-email' addonBefore='e-mail:'/>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[isValidPassword(false)]}
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            className={styles.password}
                        >
                            <Input.Password
                                data-test-id='profile-password'
                                placeholder='Пароль'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirm-password'
                            dependencies={['password']}
                            rules={[{
                                required: form?.getFieldValue('password'),
                                message: ''
                            }, isValidConfirmPassword]}
                        >
                            <Input.Password
                                data-test-id='profile-repeat-password'
                                placeholder='Повторите пароль'
                            />
                        </Form.Item>
                    </div>

                    <Form.Item style={{marginBottom: '16px'}}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={isDisabled}
                            block={xs}
                            data-test-id='profile-submit'
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </div>
    )
}
