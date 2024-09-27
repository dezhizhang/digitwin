/*
 * :file description:漏斗图
 * :name: /sungent/src/components/FunnelCharts/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-20 09:31:29
 * :last editor: 张德志
 * :date last edited: 2024-05-31 17:05:11
 */
import React, { useMemo } from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import ECharts from '@/components/ECharts';
import type { FunnelChartsDataType } from './types';
import { OPTIONS } from './constants';
import styles from './index.less';

export interface FunnelChartsProps {
  style?: CSSProperties;
  className?: string;
  dataSource?: FunnelChartsDataType[];
  formatter?: (params: any) => string;
}

const FunnelCharts: React.FC<FunnelChartsProps> = (props) => {
  const { style, className, dataSource, formatter } = props;

  /**
   * @description: 合并配置数据
   * @return {*}
   */
  const mergeOptions = () => {
    const newOptions: any = {};
    for (let key in OPTIONS) {
      if (key === 'series') {
        newOptions[key] = [
          {
            ...OPTIONS[key][0],
            data: dataSource,
            label: {
              ...OPTIONS[key][0].label,
              formatter,
            },
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
    <div style={style} className={cx(className, styles.container)}>
      <ECharts option={options} style={{ height: 300 }} />
    </div>
  );
};

export default FunnelCharts;
