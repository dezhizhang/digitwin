/*
 * :file description:
 * :name: /sungent/src/components/BilinearCharts/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 15:49:51
 * :last editor: 张德志
 * :date last edited: 2024-04-17 16:30:57
 */

import { AXIS_LABEL_COLOR, AXIS_LINE_COLOR } from '@/constants';

export const OPTIONS: any = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {},
  grid: {
    top: 16,
    right: '10%',
    bottom: '10%',
    left: '10%',
  },
  toolbox: {
    show: false,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
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
  yAxis: {
    type: 'value',
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
  series: [],
};
