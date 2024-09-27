/*
 * :file description:
 * :name: /sungent/src/components/SystemCollapse/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 14:27:31
 * :last editor: 张德志
 * :date last edited: 2024-04-29 16:22:52
 */

// 产业链类型
export type SystemCollapseDataType = {
  count?: number;
  label?: string;
  type?: string;
  value?: string;
  _id?: string;
  group_label?: string;
  group_id?:string;
  children?: SystemCollapseDataType[];
};
