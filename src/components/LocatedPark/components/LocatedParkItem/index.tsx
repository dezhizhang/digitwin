/*
 * :file description:
 * :name: /sungent/src/components/LocatedPark/components/LocatedParkItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 11:42:08
 * :last editor: 张德志
 * :date last edited: 2024-04-29 10:04:55
 */
import React from 'react';
import cx from 'classnames';
import { Progress } from 'antd';
import { CSSProperties } from 'react';
import { LocatedParkDataType } from '../../types';
import styles from './index.less';

export interface LocatedParkItemProps extends LocatedParkDataType {
  className?: string;
  style?: CSSProperties;
  currentIndex?: number;
  onClick?: () => void;
}

const LocatedParkItem: React.FC<LocatedParkItemProps> = (props) => {
  const {
    style,
    className,
    currentIndex,
    onClick,
    proportion,
    unit = '家',
    enterprisesName,
    enterprisesNumer,
  } = props;
  return (
    <div style={style} className={cx(className, styles.container)}>
      <div className={styles.index}>{currentIndex}</div>
      <div className={styles.content}>
        <h4 className={styles.title} onClick={() => onClick?.()}>
          {enterprisesName}
        </h4>
        <p className={styles.number}>
          {enterprisesNumer}&nbsp;<span>{unit}</span>
        </p>
      </div>
      <div className={styles.proportion}>
        <Progress
          width={48}
          percent={proportion}
          strokeWidth={14}
          trailColor="rgba(255, 255, 255, 0.25)"
          type="circle"
          strokeColor="#0BD6E2"
          format={(percent) => (
            <span style={{ color: '#fff', fontSize: 10 }}>{percent}%</span>
          )}
        />
      </div>
    </div>
  );
};

export default LocatedParkItem;
