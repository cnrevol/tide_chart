import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const TideChart = ({ data, currentTime }) => {
    const chartRef = useRef(null);

    const getOption = () => {
        if (!data || !data.tideHourly) return {};

        const times = data.tideHourly.map(item => item.fxTime.substring(11, 16));
        const heights = data.tideHourly.map(item => parseFloat(item.height));

        // Find index for current time line (approximate)
        // This is a simplified logic. Real logic would match timestamps.

        return {
            title: {
                text: 'Real-time Tide Chart',
                left: 'center',
                textStyle: {
                    color: '#333',
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#6a7985',
                    },
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: times,
                axisLine: {
                    lineStyle: {
                        color: '#999',
                    },
                },
            },
            yAxis: {
                type: 'value',
                name: 'Height (m)',
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee',
                    },
                },
            },
            series: [
                {
                    name: 'Tide Height',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#5470C6' },
                            { offset: 1, color: '#91CC75' },
                        ]),
                    },
                    areaStyle: {
                        opacity: 0.5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(84, 112, 198, 0.8)' },
                            { offset: 1, color: 'rgba(145, 204, 117, 0.1)' },
                        ]),
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: heights,
                    markLine: {
                        symbol: ['none', 'none'],
                        label: { show: true, formatter: 'Now' },
                        data: [
                            { xAxis: currentTime ? currentTime.substring(11, 16) : '' }
                        ]
                    }
                },
            ],
        };
    };

    return (
        <div className="tide-chart">
            <ReactECharts
                ref={chartRef}
                option={getOption()}
                style={{ height: '400px', width: '100%' }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    );
};

export default TideChart;
