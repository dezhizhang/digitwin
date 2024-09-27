/*
 * :file description: 计算card高度
 * :name: /sungent/src/hooks/useCardItemHeight.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-18 11:30:23
 * :last editor: 张德志
 * :date last edited: 2024-04-18 14:58:05
 */
import { useSize } from 'ahooks';
import { NORMAL_MARGIN_BOTTOM } from '@/constants';
import { useEffect, useState } from 'react';
import { BasicTarget } from 'ahooks/lib/utils/domTarget';

function useCardItemHeight(cardItemRef: BasicTarget) {
  const itemSize = useSize(cardItemRef);
  const [itemStyle, setItemStyle] = useState({ height: 0 });

  useEffect(() => {
    const itemHeight = itemSize?.height;
    const itemheight = (Number(itemHeight) - NORMAL_MARGIN_BOTTOM * 3) / 3;
    setItemStyle({ height: itemheight });
  }, [itemSize]);
  return itemStyle;
}

export default useCardItemHeight;
