import {Link, useLocation} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {PATHS} from '@constants/paths.ts';

const breadcrumbNameMap: Record<string, string> = {
    [PATHS.feedbacks]: 'Отзывы пользователей',
    [PATHS.calendar]: 'Календарь',
};

export const BreadcrumbItems = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const mainBreadcrumbItem = (
        <Breadcrumb.Item key="main">
            <Link to="/">Главная</Link>
        </Breadcrumb.Item>
    );

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    if (pathSnippets[0] === 'main') {
        return mainBreadcrumbItem;
    }

    return [mainBreadcrumbItem].concat(extraBreadcrumbItems);
};
