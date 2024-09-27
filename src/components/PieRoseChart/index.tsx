/*
 * :file description: 南丁格尔玫瑰图
 * :name: /sungent/src/components/PieRoseChart/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 10:23:31
 * :last editor: 张德志
 * :date last edited: 2024-05-22 17:09:03
 */
import CommonTilte from '@/components/CommonTilte';
import ECharts from '@/components/ECharts';
import cardstyles from '@/styles/cardstyle.less';
import cx from 'classnames';
import React, { CSSProperties } from 'react';
import { options } from './constants';
import styles from './index.less';

export interface PieRoseChart {
  style?: CSSProperties;
  className?: string;
}

const PieRoseChart: React.FC<PieRoseChart> = (props) => {
  const { className, style } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div>
        <CommonTilte title="近30天事件热点" />
      </div>
      <ECharts option={options}/>
    </div>
  );
};

export default PieRoseChart;
