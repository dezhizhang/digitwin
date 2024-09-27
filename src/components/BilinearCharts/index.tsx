/*
 * :file description: 双折线
 * :name: /sungent/src/components/BilinearCharts/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-17 11:55:07
 * :last editor: 张德志
 * :date last edited: 2024-04-18 16:34:39
 */

import cx from 'classnames';
import { CSSProperties } from 'react';
import React, { useMemo, useRef } from 'react';
import ECharts from '@/components/ECharts';
import CommonTilte from '@/components/CommonTilte';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import cardstyles from '@/styles/cardstyle.less';
import { BilinearChartsDataType, SeriesDataType } from './types';
import { OPTIONS } from './constants';
import styles from './index.less';

export interface BilinearChartsProps {
  title: string;
  style?: CSSProperties;
  className?: string;
  dataSource?: BilinearChartsDataType;
}

const BilinearCharts: React.FC<BilinearChartsProps> = (props) => {
  const { title, style, className, dataSource } = props;
  const { xAxisData, seriesData } = dataSource || {};

  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);

  const mergeOptions = () => {
    let newOption: any = {};
    for (let key in OPTIONS) {
      if (key === 'xAxis') {
        newOption[key] = {
          data: xAxisData || [],
        };
      }
      if (key === 'series') {
        newOption[key] = (seriesData as SeriesDataType[]).map(
          (item: SeriesDataType, index) => {
            const currentData = (OPTIONS[key] as SeriesDataType[])[index];
            return { ...currentData, ...item };
          },
        );
      }
    }

    return { ...OPTIONS, ...newOption };
  };

  const options = useMemo(() => {
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
        <ECharts option={options} style={echartStyle} />
      ) : null}
    </div>
  );
};

export default BilinearCharts;
