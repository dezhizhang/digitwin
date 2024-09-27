// 主题色
export const PRIMARY_COLOR = '#08f';

// 主题色普通
export const PRIMARY_COLOR_NORMAL = '#0BD6E2';
// 坐标线文字颜色
export const AXIS_LABEL_COLOR = '#B4C0CC';

// 坐标线颜色
export const AXIS_LINE_COLOR = '#39456A';

// 柱状图大小
export const BAR_WIDTH = '16px';

export const NORMAL_MARGIN_BOTTOM = 16;

// 柱状图颜色
export const BAR_COLOR = '#3E9CFF';

// cesium token
export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';

export const OSS_URL = 'https://cdn.xiaozhi.shop/digital';

// 高德地图影像数据
export const MAP_IMAGERY_LIST = [
  {
    name: '高德地图01',
    type: 'UrlTemplateImageryProvider',
    classConfig: {
      url:
        'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', // 纯地标图(地名)
    },
    interfaceConfig: {
      saturation: 0,
      brightness: 0.6,
      contrast: 1.8,
      hue: 1,
      gamma: 0.3,
    },
    offset: '0.0',
    invertswitch: 1,
    filterRGB: '#4e70a6',
    showswitch: 1,
    weigh: 2,
    createtime: 1624326728,
    updatetime: 1646979297,
  },
];
