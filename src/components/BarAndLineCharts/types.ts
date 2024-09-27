/*
 * :file description:
 * :name: /sungent/src/components/BarAndLineCharts/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 11:26:55
 * :last editor: 张德志
 * :date last edited: 2024-04-17 11:29:46
 */
export interface BarAndLineChartsDataType {
  // 坐标线
  xAxisData?: string[];
  // 柱状数据
  barSeriesData?: number[];
  // 折线数据
  lineSeriesData?: number[];
}
