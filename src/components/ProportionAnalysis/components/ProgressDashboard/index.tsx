/*
 * :file description:
 * :name: /sungent/src/components/ProportionAnalysis/components/ProgressDashboard/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 13:56:12
 * :last editor: 张德志
 * :date last edited: 2024-06-06 15:30:45
 */
import React from 'react';
import cx from 'classnames';
import { Progress } from 'antd';
import { CSSProperties } from 'react';

import styles from './index.less';

export interface ProgressDashboardProps {
  style?: CSSProperties;
  className?: string;
  percent?: number;
  strokeColor?:string;
  description?: string;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = (props) => {
  const {
    style,
    className,
    percent = 50,
    strokeColor = '#1F5184',
    description = '苏州企业占比',
  } = props;
  return (
    <div style={style} className={cx(className, styles.container)}>
      <Progress
        type="dashboard"
        percent={percent}
        steps={{
          count: 8,
          gap: 0,
        }}
        size={140}
        gapDegree={120}
        strokeWidth={12}
        trailColor={'#1F5184'}
        strokeColor={strokeColor}
        className={styles.progress}
        format={(percent) => <span className={styles.percent}>{percent}%</span>}
      />
      <h5 className={styles.description}>{description}</h5>
    </div>
  );
};

export default ProgressDashboard;
