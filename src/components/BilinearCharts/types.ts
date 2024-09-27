/*
 * :file description:
 * :name: /sungent/src/components/BilinearCharts/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 15:56:39
 * :last editor: 张德志
 * :date last edited: 2024-04-17 16:15:28
 */

export interface SeriesDataType {
  type: string;
  data: number[];
  color?: string;
}

export interface BilinearChartsDataType {
  xAxisData?: string[];
  seriesData: SeriesDataType[];
}
