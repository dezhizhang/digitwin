/*
 * :file description: 企业侧边栏带搜索和分页
 * :name: /sungent/src/components/EnterprisesProDrawer/service.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-12 16:22:31
 * :last editor: 张德志
 * :date last edited: 2024-06-12 16:22:50
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
