/*
 * :file description: 企业信息展示
 * :name: /sungent/src/components/EnterpriseDisplay/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-06 10:28:06
 * :last editor: 张德志
 * :date last edited: 2024-05-15 15:52:44
 */
import React, { useRef } from 'react';
import cx from 'classnames';
import { useSize } from 'ahooks';
import type { CSSProperties } from 'react';
import { NORMAL_MARGIN_BOTTOM } from '@/constants';
import EnterpriseDisplayItem from './components/EnterpriseDisplayItem';
import type { EnterpriseDisplayDataType } from './types';
import styles from './index.less';

export interface EnterpriseDisplayProps {
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  className?: string;
  dataSource?: EnterpriseDisplayDataType[];
  rowCount?: number;
}

const EnterpriseDisplay: React.FC<EnterpriseDisplayProps> = (props) => {
  const { style, itemStyle, className, dataSource, rowCount = 3 } = props;
  const displayRef = useRef(null);
  const displaySize = useSize(displayRef);
  const width =
    (Number(displaySize?.width) - NORMAL_MARGIN_BOTTOM * (rowCount - 1)) /
    rowCount;
  return (
    <div
      ref={displayRef}
      style={style}
      className={cx(className, styles.container)}
    >
      {(dataSource || []).map((item) => {
        return (
          <EnterpriseDisplayItem
            {...item}
            style={{ width: width, ...(itemStyle || {}) }}
          />
        );
      })}
    </div>
  );
};

export default EnterpriseDisplay;
