/*
 * :file description: 企业信息
 * :name: /sungent/src/components/SystemCollapse/components/EnterpriseInfo/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 15:56:37
 * :last editor: 张德志
 * :date last edited: 2024-04-29 11:09:18
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import cardstyle from '@/styles/cardstyle.less';
import { TAG_COLOR } from '@/constants';
import styles from './index.less';

export interface EnterpriseInfoProps {
  className?: string;
  style?: CSSProperties;
  enterpriseName?: string;
  enterpriseNumber?: number;
  tags?: string[];
}

const EnterpriseInfo: React.FC<EnterpriseInfoProps> = (props) => {
  const {
    style,
    className,
    tags = ['高价值产业环节', '优势产业环节'],
    enterpriseName = '新技术研究新药研发及新技术研究',
    enterpriseNumber = 1241,
  } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyle.wrapper, styles.container)}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>
          {enterpriseName}
          &nbsp;<span>{enterpriseNumber}</span>&nbsp;家
        </h3>
        <span className={styles.back}>返回</span>
      </div>
      <div className={styles.tags}>
        {(tags || []).map((item, index) => {
          return (
            <span key={item} style={{ borderColor: TAG_COLOR[index] }}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default EnterpriseInfo;
