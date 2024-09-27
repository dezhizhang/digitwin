/*
 * :file description:
 * :name: /sungent/src/components/ProportionAnalysis/components/ProgressSteps/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 15:27:12
 * :last editor: 张德志
 * :date last edited: 2024-04-16 16:19:29
 */
import React from 'react';
import cx from 'classnames';
import { Progress, Tooltip } from 'antd';
import { CSSProperties } from 'react';
import icon from './images/icon.png';
import styles from './index.less';

export interface ProgressStepsProps {
  style?: CSSProperties;
  className?: string;
  strokeColor?: string;
  trailColor?: string;
  percent?: number;
  name?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = (props) => {
  const {
    className,
    style,
    name = '苏州工业园区产值苏州工业园区产值苏州工业园区产值苏州工业园区产值苏州工业园区产值苏州工业园区产值苏州工业园区产值',
    strokeColor = '#0066FF',
    trailColor = '#1F5184',
    percent = 0,
  } = props;
  return (
    <div style={style} className={cx(className, styles.container)}>
      <div className={styles.header}>
        <img className={styles.img} src={icon} alt="苏州工业园区产值" />
        <h4 className={styles.title}>
          <Tooltip title={name} placement="topLeft">
            {name}
          </Tooltip>
        </h4>
      </div>
      <Progress
        steps={50}
        percent={percent}
        format={() => ''}
        strokeWidth={12}
        trailColor={trailColor}
        strokeColor={strokeColor}
        className={styles.progress}
      />
    </div>
  );
};

export default ProgressSteps;
