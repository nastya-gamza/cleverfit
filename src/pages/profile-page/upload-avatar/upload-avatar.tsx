import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Grid, Typography, Upload} from 'antd';

import styles from './upload-avatar.module.less';

export const UploadAvatar = () => {
    const {useBreakpoint} = Grid;

    const {xs} = useBreakpoint();

    const listType = xs ? 'picture' : 'picture-card';

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
        )
    ;

    return (
        <Upload
            name='avatar'
            maxCount={1}
            listType={listType}
            className={styles.uploader}
            showUploadList={false}
            progress={{strokeWidth: 4, showInfo: false, size: 'default'}}
        >
            {uploadButton}
        </Upload>
    )
}
