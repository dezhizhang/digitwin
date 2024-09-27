/*
 * :file description: 公共箭头
 * :name: /sungent/src/components/CommonArrow/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 10:51:03
 * :last editor: tangwanli
 * :date last edited: 2024-04-24 20:47:08
 */
import cx from 'classnames';
import React, { CSSProperties, useMemo, useRef } from 'react';
import styles from './index.less';


const CommonArrow = (props) => {
  const { style, color = '#009DFF', } = props;

  {/* 外层box */ }
  return (
    <div
      className={styles.lineBox}
      style={style}
    >
      {/* 线 */}
      <div className={styles.line} style={{ backgroundColor: color }} />
      {/* 箭头 */}
      <div className={styles.arrow}>
        <div className={styles.arrowLeft} style={{ backgroundColor: color }} />
        <div className={styles.arrowRight} style={{ backgroundColor: color }} />
      </div>
    </div>
  );
};

export default CommonArrow;
