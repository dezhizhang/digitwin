/*
 * :file description:
 * :name: /sungent/src/components/AreaStackGradient/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 11:09:13
 * :last editor: 张德志
 * :date last edited: 2024-05-11 10:45:28
 */
import * as echarts from 'echarts';

import { AXIS_LABEL_COLOR, AXIS_LINE_COLOR } from '@/constants';

export const OPTIONS: any = {
  color: ['#009DFF', '#065DFF', '#3C23BC'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: [],
    left: '8%',
    bottom: '0%',
    itemWidth: 12, // 设置宽度
    itemHeight: 12, // 设置高度
    itemGap: 12,
    icon: 'circle',
    textStyle: {
      // 图例文字的样式
      fontSize: 12,
      fontFamily: 'Microsoft Sans Serif',
      color: '#fff',
    },
  },

  grid: {
    top: 16,
    right: '2%',
    bottom: '14%',
    left: '2%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      boundaryGap: false,
      textStyle:{
        color:AXIS_LABEL_COLOR
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      stackMin: 0,
      axisLabel: {
        color: AXIS_LABEL_COLOR,
        formatter: '{value} ',
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
  ],
  series: [
    {
      name: '有迁址动力的企业',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(62, 156, 255, 0)',
          },
          {
            offset: 1,
            color: 'rgba(62, 156, 255, 1)',
          },
        ]),
      },
      label: {
        show: true,
        color: '#fff',
        position: 'top',
        formatter: '{c}',
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: '符合招商要求的企业',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(6, 93, 255, 0)',
          },
          {
            offset: 1,
            color: 'rgba(6, 93, 255, 1)',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },

      label: {
        show: true,
        color: '#fff',
        position: 'top',
        formatter: '{c}',
      },
      data: [22, 160, 282, 150, 234, 220, 340, 310],
    },
    {
      name: '链上企业总数',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(60, 35, 188, 1)',
          },
          {
            offset: 1,
            color: 'rgba(60, 35, 188, 0)',
          },
        ]),
      },

      label: {
        show: true,
        color: '#fff',
        position: 'top',
        formatter: '{c}',
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 201, 234, 120, 130, 220],
    },
  ],
};
