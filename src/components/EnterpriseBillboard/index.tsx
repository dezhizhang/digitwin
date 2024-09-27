/*
 * :file description: 企业榜单
 * :name: /sungent/src/components/EnterpriseBillboard/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-18 09:51:58
 * :last editor: 张德志
 * :date last edited: 2024-06-07 16:00:15
 */
import cx from 'classnames';
import { useSize } from 'ahooks';
import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import { MIDDLE_MARGIN_BOTTOM } from '@/constants';
import BillboardItem from './components/BillboardItem';
import type { EnterpriseBillboardDataType } from './types';
import styles from './index.less';

export interface EnterpriseBillboardProps {
  className?: string;
  style?: CSSProperties;
  dataSource?: EnterpriseBillboardDataType[];
  onBillboardClick?: (values: EnterpriseBillboardDataType) => void;
}

const EnterpriseBillboard: React.FC<EnterpriseBillboardProps> = (props) => {
  const { style, className, dataSource, onBillboardClick } = props;
  const contentRef = useRef(null);

  // 计算每个item的宽度每行最多只展示4个
  const size = useSize(contentRef);
  const width = (Number(size?.width) - MIDDLE_MARGIN_BOTTOM * 2) / 4;

  return (
    <div
      style={style}
      ref={contentRef}
      className={cx(className, styles.container)}
    >
      {width ? (
        <>
          {(dataSource || []).map((item) => {
            return (
              <BillboardItem
                {...item}
                style={{ width: width }}
                onBillboardClick={() => onBillboardClick?.(item)}
              />
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default EnterpriseBillboard;
