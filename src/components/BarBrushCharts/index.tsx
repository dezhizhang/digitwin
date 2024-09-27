/*
 * :file description: 多柱状图
 * :name: /sungent/src/components/BarBrushCharts/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 16:41:27
 * :last editor: 张德志
 * :date last edited: 2024-04-18 16:29:28
 */
import cx from 'classnames';
import React, { useMemo, useRef } from 'react';
import { CSSProperties } from 'react';
import ECharts from '@/components/ECharts';
import CommonTilte from '@/components/CommonTilte';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import type { BarBrushChartsDataType } from './types';
import { OPTIONS } from './constants';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface BarBrushChartsProps {
  title: string;
  className?: string;
  style?: CSSProperties;
  dataSource: BarBrushChartsDataType;
}

const BarBrushCharts: React.FC<BarBrushChartsProps> = (props) => {
  const { style, className, title, dataSource } = props;
  const { legendData, xAxisData, seriesData } = dataSource || {};
  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);

  const mergeOptions = () => {
    const newOption: any = {};
    for (let key in OPTIONS) {
      if (key === 'legend') {
        newOption[key] = {
          ...OPTIONS[key],
          data: legendData,
        };
      }
      if (key === 'xAxis') {
        newOption[key] = {
          ...OPTIONS[key],
          data: xAxisData,
        };
      }
      if (key === 'series') {
        newOption[key] = (seriesData || []).map((item, index) => {
          const currentData = OPTIONS[key][index];
          return { ...currentData, ...item };
        });
      }
    }
    return { ...OPTIONS, ...newOption };
  };

  const option = useMemo(() => {
    return mergeOptions();
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

export default BarBrushCharts;
