/*
 * :file description: 企业信息展示单个
 * :name: /sungent/src/components/EnterpriseDisplay/components/EnterpriseDisplayItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-06 10:45:53
 * :last editor: 张德志
 * :date last edited: 2024-05-07 11:28:21
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import cardstyles from '@/styles/cardstyle.less';
import type { EnterpriseDisplayDataType } from '../../types';
import styles from './index.less';

export interface EnterpriseDisplayItemProps extends EnterpriseDisplayDataType {
  style?: CSSProperties;
  className?: string;
}

const EnterpriseDisplayItem: React.FC<EnterpriseDisplayItemProps> = (props) => {
  const { title, count, unit, desc, style, className } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.count}>
        {count}&nbsp;
        <span className={styles.unit}>{unit}</span>
      </p>
      {desc ? <p className={styles.desc}>{desc}</p> : null}
    </div>
  );
};

export default EnterpriseDisplayItem;
