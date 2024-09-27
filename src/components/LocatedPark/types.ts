/*
 * :file description:
 * :name: /sungent/src/components/LocatedPark/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 11:44:03
 * :last editor: 张德志
 * :date last edited: 2024-04-29 10:04:20
 */
export interface LocatedParkDataType {
  key?: string;
  enterprisesName?: string; // 企业名称
  enterprisesNumer?: number; // 企业数
  proportion: number; // 占比
  unit?:string;
}
