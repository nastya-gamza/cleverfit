import {Link} from 'react-router-dom';
import {Layout, Row} from 'antd';
import {ActionCard} from '@components/card';
import {PHONES} from '@constants/phones.tsx';
import styles from './page-footer.module.less'
import {PATHS} from '@constants/paths.ts';

const {Footer} = Layout;
export const PageFooter = () => (
    <>
        <Footer className={styles.footer}>
            <Row align='bottom' className={styles.row}>
                <Link to={PATHS.feedbacks} className={styles.link} data-test-id='see-reviews'>Смотреть отзывы</Link>
                <ActionCard
                    className={styles.card}
                    title={
                        <div className={styles.cardHeader}>
                            <Link to='#' className={styles.downloadBtn}>Скачать на
                                телефон</Link>
                            <p className={styles.proTariff}>Доступно в PRO-тарифе</p>
                        </div>
                    }
                >
                    <div className={styles.phones}>
                        {PHONES.map(p => <Link to={'/'} key={p.name}>{p.icon} {p.name}</Link>)}
                    </div>
                </ActionCard>
            </Row>
        </Footer>
    </>
);
