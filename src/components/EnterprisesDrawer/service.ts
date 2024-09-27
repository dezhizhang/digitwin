/*
 * :file description: 企业侧边栏组件
 * :name: /sungent/src/components/EnterprisesDrawer/service.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-12 14:05:32
 * :last editor: 张德志
 * :date last edited: 2024-06-12 16:19:21
 */
import type { CommonResponseType } from '@/types';
import request from '@/utils/request';

// 获取在营园区总数列表
export async function getEnterprisesList(
  params?: any,
): Promise<CommonResponseType<any>> {
  return request(`/information/list`, {
    method: 'POST',
    data: params,
  });
}
