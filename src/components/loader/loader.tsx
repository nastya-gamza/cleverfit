import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import Lottie from 'lottie-react';

import loader from './assets/loader-animation.json';
import styles from './loader.module.less';

export const Loader = () => {
    const isLoading = useAppSelector(state => state.app.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles.wrapper} data-test-id='loader'>
            <Lottie animationData={loader} loop={true} className={styles.loader}/>
        </div>
    );
}
