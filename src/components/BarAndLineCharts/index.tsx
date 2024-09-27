/*
 * :file description: 柱状图和折线图
 * :name: /sungent/src/components/BarAndLineCharts/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 10:39:22
 * :last editor: 张德志
 * :date last edited: 2024-04-18 16:25:40
 */
import cx from 'classnames';
import React, { useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import CommonTilte from '@/components/CommonTilte';
import ECharts from '@/components/ECharts';
import cardstyles from '@/styles/cardstyle.less';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import type { BarAndLineChartsDataType } from './types';
import { OPTIONS } from './constants';
import styles from './index.less';

export interface BarAndLineChartsProps {
  className?: string;
  style?: CSSProperties;
  title: string;
  dataSource?: BarAndLineChartsDataType;
}

const BarAndLineCharts: React.FC<BarAndLineChartsProps> = (props) => {
  const { style, title, className, dataSource } = props;
  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);
  /**
   * @description: 合并数据
   * @param {any} option
   * @return {*}
   */
  const mergeOptionData = (option: any) => {
    const { barSeriesData, lineSeriesData, xAxisData } = dataSource || {};
    for (const key in option) {
      if (key === 'xAxis') {
        option[key][0].data = xAxisData;
      } else if (key === 'series') {
        option[key] = option[key].map((item: any) => {
          if (item.type === 'bar') {
            return { ...item, data: barSeriesData };
          } else if (item.type === 'line') {
            return { ...item, data: lineSeriesData };
          }
          return { ...item };
        });
      }
    }

    return { ...option };
  };

  const option = useMemo(() => {
    return mergeOptionData(OPTIONS);
  }, [dataSource]);

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div ref={titleRef}>
        <CommonTilte title={title} />
      </div>
      {echartStyle?.height ? (
        <ECharts option={option} style={echartStyle} />
      ) : null}
    </div>
  );
};

export default BarAndLineCharts;
