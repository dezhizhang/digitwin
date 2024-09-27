/*
 * :file description:
 * :name: /sungent/src/components/BarAndLineCharts/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 10:34:10
 * :last editor: 张德志
 * :date last edited: 2024-04-17 16:32:59
 */
import { AXIS_LABEL_COLOR, BAR_WIDTH, AXIS_LINE_COLOR } from '@/constants';

export const OPTIONS = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  toolbox: {
    show: false,
  },
  grid: {
    top: 16,
    right: '10%',
    bottom: '10%',
    left: '10%',
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow',
      },
      axisLabel: {
        color: AXIS_LABEL_COLOR,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          show: true,
          color: AXIS_LINE_COLOR,
          width: 1,
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 250,
      interval: 50,
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
    {
      type: 'value',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        color: AXIS_LABEL_COLOR,
        formatter: '{value} %',
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          show: true,
          color: AXIS_LINE_COLOR,
          width: 1,
        },
      },
    },
  ],
  series: [
    {
      type: 'bar',
      color: '#3E9CFF',
      barWidth: BAR_WIDTH,
      data: [],
    },
    {
      type: 'line',
      yAxisIndex: 1,
      color: '#00EEE6',
      data: [],
    },
  ],
};
