import {Link} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {PHONES} from '@constants/phones.tsx';
import {ActionCard} from '@pages/main-page/card';
import {Layout, Row} from 'antd';

import styles from './page-footer.module.less';

const {Footer} = Layout;

export const PageFooter = () => (
    <Footer className={styles.footer}>
        <Row align='bottom' className={styles.row}>
            <Link to={PATHS.feedbacks} className={styles.link} data-test-id='see-reviews'>
                Смотреть отзывы
            </Link>
            <ActionCard
                className={styles.card}
                title={
                    <div className={styles.cardHeader}>
                        <Link to='#' className={styles.downloadBtn}>
                            Скачать на телефон
                        </Link>
                        <p className={styles.proTariff}>Доступно в PRO-тарифе</p>
                    </div>
                }
            >
                <div className={styles.phones}>
                    {PHONES.map(p => <span key={p.name}>{p.icon} {p.name}</span>)}
                </div>
            </ActionCard>
        </Row>
    </Footer>
);
