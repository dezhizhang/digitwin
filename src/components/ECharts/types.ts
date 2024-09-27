/*
 * :file description:
 * :name: \finance-base\src\components\ECharts\types.ts
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-04-08 14:23:21
 * :last editor: 张德志
 * :date last edited: 2022-04-08 14:23:22
 */
export type EchartProps = {
  option: any;
  echarts?: any;
  notReady?: boolean;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: React.CSSProperties;
  className?: string;
  theme?: string;
  onChartReady?: (echartObj: any) => void;
  showLoading?: boolean;
  loadingOption?: any;
  onEvents?: any;
  canResize?: boolean;
};
