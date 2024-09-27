/*
 * :file description:
 * :name: /sungent/src/components/BarBrushCharts/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 17:03:37
 * :last editor: 张德志
 * :date last edited: 2024-04-17 17:36:09
 */

export interface seriesDataType {
  name?: string;
  type?: string;
  stack?: string;
  color?: string;
  barWidth?: string;
  data?: number[];
}

export interface BarBrushChartsDataType {
  xAxisData?: string[];
  legendData?: string[];
  seriesData?: seriesDataType[];
}
