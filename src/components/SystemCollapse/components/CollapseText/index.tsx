/*
 * :file description:
 * :name: /sungent/src/components/SystemCollapse/components/CollapseText/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 16:48:54
 * :last editor: 张德志
 * :date last edited: 2024-04-30 09:36:33
 */
import React from 'react';
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import type { SystemCollapseDataType } from '../../types';
import styles from './index.less';

export interface CollapseTextProps extends SystemCollapseDataType {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const CollapseText: React.FC<CollapseTextProps> = (props) => {
  const { className, style, label, count, onClick } = props;
  return (
    <div
      style={style}
      className={cx(className, styles.container)}
      onClick={() => onClick?.()}
    >
      <a className={styles.title} role="button">
        {label}
      </a>
      <span>
        {count}&nbsp;家&nbsp;&nbsp;
        <DoubleRightOutlined />
      </span>
    </div>
  );
};

export default CollapseText;
