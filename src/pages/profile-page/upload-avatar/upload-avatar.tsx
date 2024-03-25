import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {Button, Grid, Typography, Upload} from 'antd';
import type {UploadProps} from 'antd/es/upload';
import type {UploadFile, UploadFileStatus} from 'antd/es/upload/interface';

import styles from './upload-avatar.module.less';

const {useBreakpoint} = Grid;

export const UploadAvatar = ({url}: { url: string }) => {
    const {xs} = useBreakpoint();
    const navigate = useNavigate();

    const lsToken = localStorage.getItem('token');


    const initialFile = useMemo(
        () => ({
            uid: '1',
            name: 'avatar.png',
            url,
        }),
        [url],
    );

    const [fileList, setFileList] = useState<UploadFile[]>(url ? [initialFile] : []);
    const showPreview = !!fileList[0];

    const listType = xs ? 'picture' : 'picture-card';

    useEffect(() => {
        if (url) {
            setFileList([initialFile]);
        }
    }, [url, initialFile]);

    const uploadButton = (
        xs ?
            <div className={styles.mobilePreview}>
                <span>Загрузить фото профиля:</span>
                <Button icon={<UploadOutlined/>}>Загрузить</Button>
            </div>
            :
            <div className={styles.preview}>
                <PlusOutlined/>
                <Typography.Text type="secondary">Загрузить фото профиля</Typography.Text>
            </div>
    );

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);

        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialFile,
                    url: '',
                    name: newFile.name,
                    status: 'error' as UploadFileStatus,
                };

                setFileList([errorFile]);
            }

            if (newFile.error?.status === 409) {
                error(
                    'Файл слишком большой',
                    'Выберите файл размером до 5 МБ.',
                    'Закрыть',
                    () => navigate(PATHS.profile, {state: {from: 'redirect'}}),
                    true,
                );
            }
        }
    };

    return (
        <Upload
            headers={{Authorization: `Bearer ${lsToken}`}}
            action='https://marathon-api.clevertec.ru/upload-image'
            maxCount={1}
            fileList={fileList}
            listType={listType}
            className={styles.uploader}
            onChange={handleChange}
            progress={{showInfo: false, strokeWidth: 4, strokeColor: '#2F54EB',}}
        >
            {!showPreview && uploadButton}
        </Upload>
    )
}
