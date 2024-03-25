import {REGEX} from '@constants/regex.ts';

export const isValidEmail = (_rule: unknown, value: string) => {
    if (value && REGEX.email.test(value)) {
        return Promise.resolve()
    }

    return Promise.reject(new Error());
};

export const isValidPassword = (isRequired = true) => ({
    validator(_: unknown, value: string) {
        if (value && REGEX.password.test(value)) {
            return Promise.resolve();
        }

        if (!isRequired && !value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error());
    },
});

export const isValidConfirmPassword = ({ getFieldValue }: { getFieldValue: any }) => ({
    validator(_rule: unknown, value: string) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Пароли не совпадают'));
    },
});
