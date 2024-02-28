import { useState } from 'react';
import { FormInstance } from 'antd/lib/form';
import {FieldData} from "rc-field-form/lib/interface";

export const useEmailValidation = (form: FormInstance) => {
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = () => {
        const isValid = form.isFieldTouched('email') && form.getFieldError('email').length === 0;
        setIsEmailValid(isValid);
        return isValid;
    };

    return { isEmailValid, validateEmail };
};

export const useRegisterFieldsValidation = (form: FormInstance) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const validateFields = (_changedFields: FieldData[], allFields: FieldData[]) => {
        if (allFields.every(field => field.touched)) {
            const hasErrors = form.getFieldsError(['email', 'password', 'confirm-password'])
                .some(({errors}) => errors.length);
            setIsDisabled(hasErrors);
        }
    };

    return { isDisabled, validateFields };
};
