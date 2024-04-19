export const getPieChartConfig = (
    isFullScreen: boolean | undefined,
) => {
    const width = isFullScreen ? 500 : 340;
    const fontSize = isFullScreen ? 14 : 12;
    const color = { color: { palette: 'set2' } };

    return {
        angleField: 'percentage',
        colorField: 'exercise',
        innerRadius: 0.35,
        radius: 0.5,
        scale: color,
        width,
        label: {
            text: 'exercise',
            fontSize,
            fontFamily: 'Inter',
            opacity: 2,
            position: 'outside',
            connector: false,
            style: {
                color: '#262626',
            },
            hyphens: 'auto',
        },
        legend: false,
    };
};
