/*
 * :file description: 计算echarts高度
 * :name: /sungent/src/hooks/useEchartsHeight.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-18 15:35:26
 * :last editor: 张德志
 * :date last edited: 2024-04-18 15:41:17
 */
import { useSize } from 'ahooks';
import { CSSProperties, useState, useEffect } from 'react';
import { NORMAL_MARGIN_BOTTOM } from '@/constants';
import { BasicTarget } from 'ahooks/lib/utils/domTarget';

function useEchartsHeight(titleRef: BasicTarget, cardStyle?: CSSProperties) {
  const titleSize = useSize(titleRef);

  const [echartStyle, setItemStyle] = useState({ height: 0 });

  useEffect(() => {
    const cardHeight = Number(cardStyle?.height);
    const titleHeight = Number(titleSize?.height);
    const height = cardHeight - titleHeight - NORMAL_MARGIN_BOTTOM * 2;
    setItemStyle({ height });
  }, [titleSize, cardStyle]);
  return echartStyle;
}

export default useEchartsHeight;
