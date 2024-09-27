/*
 * :file description:
 * :name: /sungent/src/components/PieChart/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 11:00:38
 * :last editor: 张德志
 * :date last edited: 2024-05-11 10:02:25
 */
import { PIE_COLOR } from '@/constants';

export const OPTIONS = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: '60%',
    top: '20%',
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 18,
    icon: 'circle',
    textStyle: {
      // 图例文字的样式
      fontSize: 12,
      fontFamily: 'Microsoft Sans Serif',
      color: '#fff',
    },
    formatter: function (name: string) {
      return `${name}`;
    },
  },

  series: [
    {
      type: 'pie',
      radius: ['50%', '74%'],
      center: ['26%', '50%'],
      color: PIE_COLOR,
      data: [],
      label: {
        normal: {
          show: true,
          position: 'center',
          formatter: '{total|' + 100 + '}' + '\n\r' + '{active|资本总额（万元)}',
          rich: {
            total: {
              fontSize: 24,
              fontFamily: '思源黑体',
              color: '#fff',
            },
            active: {
              fontFamily: 'Microsoft Sans Serif',
              fontSize: 12,
              color: '#fff',
              lineHeight: 30,
            },
          },
        },
        emphasis: {
          //中间文字显示
          show: true,
        },
      },
      itemStyle: {
        normal: {
          label: {
            show: false, //隐藏标示文字
          },
          labelLine: {
            show: false, //隐藏标示线
          },
        },
      },
    },
  ],
};
