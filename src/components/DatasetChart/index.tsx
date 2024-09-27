/*
 * :file description: 多柱状图
 * :name: /sungent/src/components/DatasetChart/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-18 09:51:58
 * :last editor: 张德志
 * :date last edited: 2024-06-07 16:00:15
 */

import ECharts from '@/components/ECharts';
import cardstyles from '@/styles/cardstyle.less';
import cx from 'classnames';
import React from 'react';
import { options } from './constants';
import styles from './index.less';

export interface DatasetChartProps {
  className?: string;
}

const DatasetChart: React.FC<DatasetChartProps> = (props) => {
  const { className } = props;
  return (
    <div className={cx(className, cardstyles.wrapper, styles.container)}>
      <ECharts option={options} />
    </div>
  );
};

export default DatasetChart;
