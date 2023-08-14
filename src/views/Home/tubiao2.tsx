import React, { PureComponent } from "react";
import * as eCharts from 'echarts';

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;


export default class Bpp extends PureComponent {

    eChartsRef: any = React.createRef();
    componentDidMount() {

        const myChart = eCharts.init(this.eChartsRef.current);

        let option = {
            title: {
                text: '派件量与寄件量趋势图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['今日派件量', '今日寄件量', '今日派件收入', '今日寄件收入', '今日总收入']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '今日派件量',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210,110,130,150,109,117]
                },
                {
                    name: '今日寄件量',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310,220,310,340,180,290]
                },
                {
                    name: '今日派件收入',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410,500,400,380,470,560]
                },
                {
                    name: '今日寄件收入',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320,320,335,337,380,310]
                },
                {
                    name: '今日总收入',
                    type: 'line',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320,990,1200,900,800,1200,1000]
                }
            ]
        };

        option && myChart.setOption(option);
    }


    render() {

        return <div ref={this.eChartsRef} style={{

            width: 1350,
            height: 400,
            margin: 100

        }}></div>;

    }

}