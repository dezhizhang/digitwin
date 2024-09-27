/*
 * :file description:多柱状图配置
 * :name: /sungent/src/components/BarBrushCharts/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 16:54:15
 * :last editor: 张德志
 * :date last edited: 2024-04-17 17:40:04
 */

import { BAR_WIDTH, AXIS_LABEL_COLOR, AXIS_LINE_COLOR } from '@/constants';

const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
};

export const OPTIONS: any = {
  legend: {
    data: [],
    bottom: '-2%',
    itemHeight: 8,
    icon: 'circle',
    textStyle: {
      color: '#fff',
      fontSize: '12px',
    },
  },
  brush: {
    xAxisIndex: 0,
  },
  toolbox: {
    show: false,
  },

  tooltip: {},
  xAxis: {
    data: [],
    axisLine: {
      onZero: true,
      lineStyle: {
        show: true,
        color: AXIS_LINE_COLOR,
        width: 1,
      },
    },
    splitLine: { show: false },
    splitArea: { show: false },
    axisLabel: {
      color: AXIS_LABEL_COLOR,
    },
  },
  yAxis: {
    axisLabel: {
      color: AXIS_LABEL_COLOR,
      formatter: '{value} k',
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        show: false,
        color: AXIS_LINE_COLOR,
        width: 1,
      },
    },
  },
  grid: {
    top: 16,
    right: '10%',
    bottom: '22%',
    left: '10%',
  },
  series: [
    {
      name: '本地企业营收',
      type: 'bar',
      stack: 'two',
      color: '#3E9CFF',
      barWidth: BAR_WIDTH,
      emphasis: emphasisStyle,
      data: [],
    },
    {
      name: '迁入企业营收',
      type: 'bar',
      stack: 'two',
      color: '#00EEE6',
      barWidth: BAR_WIDTH,
      data: [],
    },
    {
      name: '迁出企业营收',
      type: 'bar',
      stack: 'two',
      color: '#EF9D57',
      barWidth: BAR_WIDTH,
      emphasis: emphasisStyle,
      data: [],
    },
  ],
};
