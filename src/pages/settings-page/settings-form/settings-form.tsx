import {ExclamationCircleOutlined} from '@ant-design/icons';
import {SettingsOptions} from '@constants/settings-options.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useUpdateCurrentUserMutation} from '@redux/api/profile-api.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {ProfileInfo} from '@redux/types/profile.ts';
import {Form, Switch, Tooltip} from 'antd';
import classNames from 'classnames';

import styles from './settings-form.module.less';


export const SettingsForm = () => {
    const profileInfo = useAppSelector(selectProfileInfo);
    const [updateCurrentUser] = useUpdateCurrentUserMutation();

    const handleChange = (changedValues: Partial<ProfileInfo>) => {
        updateCurrentUser(changedValues)
    };

    return (
        <Form
            initialValues={profileInfo}
            onValuesChange={handleChange}
            className={styles.form}
        >
            {SettingsOptions.map(({title, tooltip, isPro, name, dataTestId, dataTestIdIcon}) => {
                const coverPro = !profileInfo.tariff && isPro;

                return (
                    <div className={styles.option} key={title}>
                        <div className={classNames(styles.label, {[styles.disabled]: coverPro})}>
                            <span className={styles.optionTitle}>{title}</span>
                            <Tooltip title={tooltip}>
                                <ExclamationCircleOutlined data-test-id={dataTestIdIcon}/>
                            </Tooltip>
                        </div>
                        <Form.Item
                            key={title}
                            name={name}
                            valuePropName='checked'
                            className={styles.option}
                        >
                            <Switch
                                disabled={coverPro}
                                data-test-id={dataTestId}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    )
}
