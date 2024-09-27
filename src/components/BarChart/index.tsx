/*
 * :file description: 柱状图
 * :name: /sungent/src/components/BarChart/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 10:27:49
 * :last editor: 张德志
 * :date last edited: 2024-04-18 16:31:34
 */
import cx from 'classnames';
import React, { useMemo, useRef } from 'react';
import { CSSProperties } from 'react';
import ECharts from '@/components/ECharts';
import CommonTilte from '@/components/CommonTilte';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import cardstyles from '@/styles/cardstyle.less';
import type { BarChartDataType } from './types';
import { OPTIONS } from './constants';
import styles from './index.less';

export interface BarChartProps {
  title: string;
  style?: CSSProperties;
  className?: string;
  dataSource: BarChartDataType;
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const { title, className, style, dataSource } = props;
  const { xAxisData, seriesData } = dataSource || {};
  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);

  /**
   * @description: 合并options数据
   * @return {*}
   */
  const mergeOptions = () => {
    const newOptions: any = {};
    for (const key in OPTIONS) {
      if (key === 'xAxis') {
        newOptions[key] = {
          ...OPTIONS[key],
          data: xAxisData || [],
        };
      } else if (key === 'series') {
        newOptions[key] = [
          {
            ...OPTIONS[key][0],
            data: seriesData || [],
          },
        ];
      }
    }
    return { ...OPTIONS, ...newOptions };
  };

  const options = useMemo(() => {
    return mergeOptions();
  }, [dataSource]);

  return (
    <div
      className={cx(className, cardstyles.wrapper, styles.container)}
      style={style}
    >
      <div ref={titleRef}>
        <CommonTilte title={title} />
      </div>
      {echartStyle?.height ? <ECharts option={options} style={echartStyle}/> : null}
    </div>
  );
};

export default BarChart;
