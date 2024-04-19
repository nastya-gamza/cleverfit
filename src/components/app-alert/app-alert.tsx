import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectAlert, setAlert} from '@redux/slices/app-slice.ts';
import {Alert} from 'antd';

import styles from './app-alert.module.less';

export const AppAlert = () => {
    const dispatch = useAppDispatch();
    const {type, message, dataTestId} = useAppSelector(selectAlert);

    if (!type) {
        return null;
    }

    const handleClose = () => {
        dispatch(setAlert({type: undefined, message: undefined, dataTestId: ''}));
    }

    return (
        <Alert
            type={type}
            message={message}
            showIcon={true}
            closable={true}
            className={styles.alert}
            onClose={handleClose}
            data-test-id={dataTestId}
        />
    )
}
