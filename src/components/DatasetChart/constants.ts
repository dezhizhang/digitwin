const colors = ['#5470C6', '#91CC75', '#EE6666'];
export const options = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  grid: {
    top: 16,
    right: '10%',
    bottom: '12%',
    left: '10%',
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },

  legend: {
    bottom: '2%',
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
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      // prettier-ignore
      data: ['政民通', '政企通', '来电', '12345转'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
    {
      type: 'value',
      name: '单位: 件',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2],
        },
      },
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      type: 'bar',
      barWidth: 16,
      data: [300.0, 120.9, 160.0, 203.2],
    },
    {
      type: 'bar',
      yAxisIndex: 1,
      barWidth: 16,
      data: [100.0, 120.9, 160.0, 403.2],
    },
    {
      type: 'bar',
      barWidth: 16,
      data: [200.0, 180.9, 160.0, 203.2],
    },
    {
      type: 'bar',
      barWidth: 16,
      data: [200.0, 140.9, 160.0, 203.2],
    },
  ],
};
