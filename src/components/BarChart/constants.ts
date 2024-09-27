/*
 * :file description:
 * :name: /sungent/src/components/BarChart/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 17:52:38
 * :last editor: 张德志
 * :date last edited: 2024-05-11 10:44:51
 */
import {
  BAR_WIDTH,
  BAR_COLOR,
  AXIS_LINE_COLOR,
  AXIS_LABEL_COLOR,
} from '@/constants';

export const OPTIONS = {
  tooltip: {},
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      color: AXIS_LABEL_COLOR,
      fontSize: '10px',
      interval: 0, // 显示所有标签
      rotate: -6, // 旋转标签45度
      margin: 8, // 标签与轴线之间的距离
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
  grid: {
    top: 16,
    right: '10%',
    bottom: '12%',
    left: '10%',
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: (value: number) => {
        return (value / 1000) + 'k';
      },
      textStyle:{
        color:AXIS_LABEL_COLOR
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        // color: AXIS_LABEL_COLOR,
      },
    },
  },
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: BAR_WIDTH,
      color: BAR_COLOR,
      label: {
        show: true, // 显示数值
        position: 'top', // 数值显示的位置
        textStyle: {
          fontSize: '10px',
          fontWeight: 'normal',
          color: '#fff',
        },
      },
    },
  ],
};
