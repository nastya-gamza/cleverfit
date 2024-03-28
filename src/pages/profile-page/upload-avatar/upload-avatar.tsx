import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {selectProfileInfo, setProfileInfo} from '@redux/slices/profile-slice.ts';
import {Button, Grid, Modal, Typography, Upload} from 'antd';
import type {UploadProps} from 'antd/es/upload';
import type {UploadFile, UploadFileStatus} from 'antd/es/upload/interface';

import styles from './upload-avatar.module.less';
import {BASE_API_URL} from '@constants/api.ts';
import {ENDPOINTS} from '@constants/endpoints.ts';

const {useBreakpoint} = Grid;

type UploadAvatarProps = {
    url: string;
    setIsDisabled: Dispatch<SetStateAction<boolean>>;
}

export const UploadAvatar = ({url, setIsDisabled}: UploadAvatarProps) => {
    const {xs} = useBreakpoint();
    const profileInfo = useAppSelector(selectProfileInfo);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
        setIsDisabled(false);

        const newFile = newFileList[0];

        if (!newFile) {
            const updatedProfileInfo = {
                ...profileInfo,
                imgSrc: '',
            };

            dispatch(setProfileInfo(updatedProfileInfo));
        }

        if (newFile?.response?.url) {
            const updatedProfileInfo = {
                ...profileInfo,
                imgSrc: `https://training-api.clevertec.ru/${newFile.response.url}`,
            };

            dispatch(setProfileInfo(updatedProfileInfo));
        }

        if (newFile?.status === 'error') {
            const errorFile = {
                ...initialFile,
                url: '',
                name: newFile.name,
                status: 'error' as UploadFileStatus,
            };

            setFileList([errorFile]);
        }

        if (newFile?.error?.status === 409) {
            error(
                'Файл слишком большой',
                'Выберите файл размером до 5 МБ.',
                'Закрыть',
                () => navigate(PATHS.profile, {state: {from: 'redirect'}}),
                'big-file-error-close',
                true,
            );
            setIsDisabled(true);
        }
    };

    return (
        <Upload
            headers={{Authorization: `Bearer ${lsToken}`}}
            action={`${BASE_API_URL}${ENDPOINTS.uploadImage}`}
            onChange={handleChange}
            maxCount={1}
            fileList={fileList}
            listType={listType}
            className={styles.uploader}
            progress={{showInfo: false, strokeWidth: 4, strokeColor: '#2F54EB',}}
        >
            {!showPreview && uploadButton}
        </Upload>
    )
}
