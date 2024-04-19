import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {AuthForm} from '@pages/auth-page/auth-form';
import {RegisterForm} from '@pages/auth-page/register-form';
import Logo from '@public/icons/logo.svg?react';
import {Card, Tabs} from 'antd';

import styles from './auth-page.module.less';

type ActiveTab = {
    activeTab: 'login' | 'register';
}

export const AuthPage = ({activeTab = 'register'}: ActiveTab) => {
    const navigate = useNavigate();

    const handleActiveTab = (tab: string) => (
        tab === 'login' ? navigate(PATHS.auth) : navigate(PATHS.register)
    );

    const items = [
        {label: 'Вход', key: 'login', children: <AuthForm/>},
        {label: 'Регистрация', key: 'register', children: <RegisterForm/>},
    ];

    return (
        <Card className={styles.formContainer}>
            <Logo className={styles.logo}/>
            <Tabs
                items={items}
                activeKey={activeTab}
                onChange={handleActiveTab}
                className={styles.tabs}
            />
        </Card>
    );
};
