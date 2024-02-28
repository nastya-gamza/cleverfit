import {ReactNode} from 'react';
import {Card} from 'antd';

type CardProps = {
    children: ReactNode;
    className?: string;
}

export const InfoCard = ({children, className}: CardProps) => (
    <Card className={className}>{children}</Card>
);
