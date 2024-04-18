import {ColumnConfig} from '@ant-design/plots';
import {DDMM} from '@constants/date-formates.ts';
import {Moment} from 'moment';
import moment from 'moment/moment';

export const columnChartConfig: ColumnConfig = {
    xField: 'date',
    yField: 'value',
    sizeField: 30,
    style: {fill: '#85a5ff'},
    autoFit: true,
    height: 374,
    marginBottom: 24,
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    axis: {
        x: {
            title: 'Нагрузка, кг',
            tick: false,
            titleFontSize: 14,
            labelSpacing: 16,
            labelFontSize: 12,
            labelFontFamily: 'Inter',
            labelFillOpacity: 2,
            labelFill: '#8C8C8C',
            line: true,
            lineLineDash: [3, 4],
            lineLineWidth: 1,
            labelAlign: 'horizontal',
            labelAutoRotate: false,
            labelFormatter: (date: Moment) => moment(date).format(DDMM),
        },
        y: {
            tick: false,
            labelFormatter: (load: number) => `${load} кг`,
            labelFontSize: 12,
            labelSpacing: 4,
            labelFontFamily: 'Inter',
            labelFillOpacity: 2,
            labelFill: '#8C8C8C',
            labelAlign: 'horizontal',
            labelAutoRotate: false,
        },
    },
    interaction: {
        elementHighlightByColor: false,
    },
};
