export const options = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // orient: 'vertical',
    // left: '60%',
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
  series: [
    {
      type: 'pie',
      radius: ['50%', '78%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '政企通' },
        { value: 735, name: '政民通' },
        { value: 580, name: '来电' },
        { value: 484, name: '12345来电' },
      ]
    }
  ]
};