import {HttpStatuses} from '@constants/http-statuses.ts';
import {PATHS} from '@constants/paths.ts';
import {ResultStatusType} from 'antd/es/result';

export type ResultStatuses =
    | 'success'
    | 'error-login'
    | 'error'
    | 'error-user-exist'
    | 'error-check-email-no-exist'
    | 'error-check-email'
    | 'error-change-password'
    | 'success-change-password';

export type AuthResultsTypes = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    buttonText: string;
    buttonTestId: string;
    redirectTo: string;
};

export const AuthResults: Record<ResultStatuses, AuthResultsTypes> = {
    success: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle: 'Регистрация прошла успешно. Зайдите в\u00A0приложение, используя свои e-mail и пароль',
        buttonText: 'Войти',
        buttonTestId: 'registration-enter-button',
        redirectTo: PATHS.auth,
    },
    'error-login': {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: 'Что-то пошло не так. Попробуйте еще раз',
        buttonText: 'Повторить',
        buttonTestId: 'login-retry-button',
        redirectTo: PATHS.auth,
    },
    'error': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз',
        buttonText: 'Повторить',
        buttonTestId: 'registration-retry-button',
        redirectTo: PATHS.register,
    },
    'error-user-exist': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail',
        buttonText: 'Назад к регистрации',
        buttonTestId: 'registration-back-button',
        redirectTo: PATHS.register,
    },
    'error-check-email-no-exist': {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subTitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail',
        buttonText: 'Попробовать снова',
        buttonTestId: 'check-retry-button',
        redirectTo: PATHS.auth,
    },
    'error-check-email': {
        status: HttpStatuses.serverError,
        title: 'Что-то пошло не так',
        subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз',
        buttonText: 'Назад',
        buttonTestId: 'check-back-button',
        redirectTo: PATHS.auth,
    },
    'error-change-password': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
        buttonTestId: 'change-retry-button',
        redirectTo: PATHS.changePassword,
    },
    'success-change-password': {
        status: 'success',
        title: 'Пароль успешно изменен',
        subTitle: 'Теперь можно войти в аккаунт, используя свой\u00A0логин и новый пароль',
        buttonText: 'Вход',
        buttonTestId: 'change-entry-button',
        redirectTo: PATHS.auth,
    },
};
