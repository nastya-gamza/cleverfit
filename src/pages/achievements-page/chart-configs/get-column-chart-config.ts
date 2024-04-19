import {DDMM} from '@constants/date-formates.ts';
import {Moment} from 'moment';
import moment from 'moment/moment';
import {ACHIEVEMENTS} from '@constants/achievements.ts';

export const getColumnChartConfig = (
    achievementType: ACHIEVEMENTS,
    isFullScreen: boolean | undefined,
) => {
    const scrollBarProps = achievementType === ACHIEVEMENTS.month ? {x: {ratio: 0.5}} : false;

    const spacing = isFullScreen ? 16 : 18;
    const sizeField = isFullScreen ? 30 : 20;
    const fontSize = isFullScreen ? 14 : 12;

    return {
        xField: 'date',
        yField: 'value',
        style: {fill: '#85a5ff'},
        autoFit: true,
        height: 374,
        marginBottom: 24,
        marginTop: 24,
        marginLeft: 16,
        marginRight: 16,
        sizeField,
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: spacing,
                titlePosition: 'bottom',
                tick: false,
                titleFontSize: fontSize,
                line: true,
                lineLineDash: [3, 4],
                lineLineWidth: 1,
                labelAlign: 'horizontal',
                labelFontSize: 12,
                labelFontFamily: 'Inter',
                labelFillOpacity: 2,
                labelFill: '#8C8C8C',
                labelSpacing: spacing,
                labelAutoRotate: false,
                labelFormatter: (date: Moment) => moment(date).format(DDMM),
            },
            y: {
                tick: false,
                labelFormatter: (load: number) => `${load} кг`,
                labelSpacing: spacing,
                labelFontSize: 12,
                labelFontFamily: 'Inter',
                labelFillOpacity: 2,
                labelFill: '#8C8C8C',
                labelAlign: 'horizontal',
                labelAutoRotate: false,
            },
        },
        scale: {
            x: {padding: 0.5},
        },
        scrollbar: scrollBarProps,
        interaction: {
            elementHighlightByColor: false,
        },
    };
};
