import {PieConfig} from '@ant-design/plots';

export const pieChartConfig: PieConfig = {
    angleField: 'percentage',
    colorField: 'exercise',
    height: 334,
    innerRadius: 0.75,
    paddingTop: 90,
    paddingLeft: 0,
    label: {
        text: 'exercise',
        position: 'outside',
        connector: false,
        style: {
            fontWeight: 700,
            fontSize: 14,
            color: '#262626',
        },
    },
    legend: false,
};
