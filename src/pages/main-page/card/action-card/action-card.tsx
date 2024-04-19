import {ReactNode} from 'react';
import {Card} from 'antd';

type CardProps = {
    children: ReactNode;
    title: ReactNode;
    className?: string;
}

export const ActionCard = ({children, title, className}: CardProps) => (
    <Card size='small' title={title} className={className}>
        {children}
    </Card>
);
