/*
 * :file description: 企业item
 * :name: /sungent/src/components/EnterprisesItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 09:52:32
 * :last editor: 张德志
 * :date last edited: 2024-06-11 19:27:23
 */
import React, { CSSProperties } from 'react';
import { Button } from 'antd';
import cx from 'classnames';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface EnterprisesItemProps {
  style?: CSSProperties;
  className?: string;
  industry?: string;
  enterprisesName?: string;
  onEnterpriseClick?:() => void; // 企业详情事件
}

const EnterprisesItem: React.FC<EnterprisesItemProps> = (
  props,
) => {
  const { style, className, industry, enterprisesName,onEnterpriseClick } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <h3 className={styles.title}>{enterprisesName}</h3>
          <p className={styles.desc}>
            行业：<span>{industry}</span>
          </p>
        </div>
        <div className={styles.right}>
          <Button type="text" className={styles.btn} onClick={() => onEnterpriseClick?.()}>查看企业画像</Button>
        </div>
      </div>
    </div>
  );
};

export default EnterprisesItem;
