/*
 * :file description:
 * :name: /sungent/src/components/EnterpriseBillboard/components/BillboardItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-19 09:14:06
 * :last editor: 张德志
 * :date last edited: 2024-06-07 15:50:06
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import type { EnterpriseBillboardDataType } from '../../types';
import styles from './index.less';

export interface BillboardItemProps extends EnterpriseBillboardDataType {
  className?: string;
  style?: CSSProperties;
  onBillboardClick?: () => void;
}

const BillboardItem: React.FC<BillboardItemProps> = (props) => {
  const {
    style,
    className,
    iconUrl,
    number,
    name,
    unit,
    onBillboardClick,
  } = props;
  return (
    <div
      style={style}
      className={cx(className, styles.container)}
      onClick={() => onBillboardClick?.()}
    >
      <img src={iconUrl} className={styles.img} />
      <div className={styles.content}>
        <h5 className={styles.title}>{name}</h5>
        <h3 className={styles.number}>
          {number}&nbsp;
          <span className={styles.unit}>{unit}</span>
        </h3>
      </div>
    </div>
  );
};

export default BillboardItem;
