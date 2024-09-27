/*
 * :file description:
 * :name: /sungent/src/components/Tag/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 11:12:42
 * :last editor: 张德志
 * :date last edited: 2024-04-16 11:22:13
 */
import React, { CSSProperties } from 'react';
import cx from 'classnames';
import styles from './index.less';

export interface TagProps {
  name: string;
  className?: string;
  style?: CSSProperties;
}

const Tag: React.FC<TagProps> = (props) => {
  const { name, className, style } = props;
  return (
    <span style={style} className={cx(className, styles.container)}>
      {name}
    </span>
  );
};

export default Tag;
