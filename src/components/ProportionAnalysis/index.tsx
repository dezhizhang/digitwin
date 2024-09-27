/*
 * :file description:区域占比分析
 * :name: /sungent/src/components/ProportionAnalysis/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 10:16:27
 * :last editor: 张德志
 * :date last edited: 2024-06-06 15:31:08
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import CommonTilte from '@/components/CommonTilte';
import ProgressSteps from './components/ProgressSteps';
import ProgressDashboard from './components/ProgressDashboard';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface ProportionAnalysisProps {
  title: string;
  style?: CSSProperties;
  className?: string;
}

const marginBottomStyle = {
  marginBottom: 10,
};

const ProportionAnalysis: React.FC<ProportionAnalysisProps> = (props) => {
  const { title, className, style } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} className={styles.title} />
      <div className={styles.dashboard}>
        <ProgressDashboard
          percent={21}
          strokeColor="#0066FF"
          description="政企通"
        />
        <ProgressDashboard
          percent={37}
          strokeColor="#00EEE6"
          description="政民通"
        />
      </div>
      <ProgressSteps
        percent={21}
        name="政企通占比"
        style={marginBottomStyle}
      />
      <ProgressSteps percent={37} name="政民通占比" strokeColor="#00EEE6" />
    </div>
  );
};

export default ProportionAnalysis;
