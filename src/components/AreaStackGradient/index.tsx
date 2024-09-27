/*
 * :file description: 渐变堆叠面积图
 * :name: /sungent/src/components/AreaStackGradient/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 10:51:03
 * :last editor: 张德志
 * :date last edited: 2024-04-18 16:04:26
 */
import cx from 'classnames';
import React, { CSSProperties, useMemo, useRef } from 'react';
import Echarts from '@/components/ECharts';
import CommonTilte from '@/components/CommonTilte';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import type { AreaStackGradientDataType } from './types';
import { OPTIONS } from './constants';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface AreaStackGradientProps {
  className?: string;
  style?: CSSProperties;
  dataSource: AreaStackGradientDataType;
  title: string;
}

const AreaStackGradient: React.FC<AreaStackGradientProps> = (props) => {
  const { className, style, dataSource, title } = props;
  const { legendData,xAxisData } = dataSource || {};
  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);



  const mergeOptions = () => {
    const newOptions: any = {};
    for (let key in OPTIONS) {
      if (key === 'legend') {
        newOptions[key] = {
          ...OPTIONS[key],
          data: legendData || [],
        };
      }
      if(key === 'xAxis') {
      
        newOptions[key] = [
          {
            ...OPTIONS[key][0],
            data:xAxisData || [],
          }
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
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div ref={titleRef}>
        <CommonTilte title={title} />
      </div>
      <Echarts option={options} style={echartStyle} />
    </div>
  );
};

export default AreaStackGradient;
