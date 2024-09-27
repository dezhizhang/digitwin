/*
 * :file description:
 * :name: /sungent/src/components/FunnelCharts/constants.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-20 09:33:17
 * :last editor: 张德志
 * :date last edited: 2024-05-07 17:31:56
 */
export const OPTIONS = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}%',
  },
  toolbox: {
    show: false,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  grid: {
    top: '5%',
    right: '5%',
    bottom: '5%',
    left: '5%',
  },
  legend: {
    show: false,
    data: [],
  },
  series: [
    {
      type: 'funnel',
      left: '0%',
      top: 20,
      bottom:0,
      width: '100%',
      height:"86%",
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'ascending',
      gap: 0,
      label: {
        show: true,
        position: 'inside',
        fontSize: '14px',
        color: '#ffff',
      },
      itemStyle: {
        borderWidth: 0,
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 0,
          type: 'none',
        },
      },
      color: ['#00C43A', '#FFA341', '#009DFF', '#0159CC'],
      data: [],
    },
  ],
};
