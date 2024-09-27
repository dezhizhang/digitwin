/*
 * :file description:
 * :name: /sungent/src/components/NewBreadcrumb/types.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-07 14:34:33
 * :last editor: 张德志
 * :date last edited: 2024-05-07 15:02:39
 */

export interface BreadcrumbListDataType {
  // 名称
  name?: string;
  // 是否跳转
  isLink?: boolean;
  // 返回url
  backUrl?: string;
}
