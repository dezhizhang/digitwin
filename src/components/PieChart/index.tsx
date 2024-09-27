/*
 * :file description: 饼状图
 * :name: /sungent/src/components/PieChart/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 10:23:31
 * :last editor: 张德志
 * :date last edited: 2024-05-22 17:09:03
 */
import cx from 'classnames';
import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import ECharts from '@/components/ECharts';
import CommonTilte from '@/components/CommonTilte';
import useEchartsHeight from '@/hooks/useEchartsHeight';
import { OPTIONS } from './constants';
import type { PieChartDataType } from './types';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface PieChartProps {
  title: string;
  className?: string;
  style?: CSSProperties;
  titleText?: string;
  dataSource?: PieChartDataType[];
  extendRender?: () => ReactElement | ReactNode;
  formatter?: (name: string) => string;
  labelFormatter?: (name?: string) => string;
}

const PieChart: React.FC<PieChartProps> = (props) => {
  const {
    title,
    className,
    style,
    dataSource,
    formatter,
    extendRender,
    labelFormatter,
  } = props;
  const titleRef = useRef(null);
  const echartStyle = useEchartsHeight(titleRef, style);

  const mergeOptions = () => {
    const newOption: any = {};
    for (let key in OPTIONS) {
      if (key === 'legend' && formatter) {
        newOption[key] = {
          ...OPTIONS[key],
          formatter: formatter,
        };
      }

      if (key === 'series') {
        const normal = OPTIONS[key][0]?.label?.normal;
        const formatter = normal.formatter;
        newOption[key] = {
          ...OPTIONS[key][0],
          data: dataSource || [],
          label: {
            normal: {
              ...normal,
              formatter: labelFormatter || formatter,
            },
          },
        };
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
        <>
          <ECharts option={options} style={echartStyle} />
          {extendRender?.()}
        </>
      ) : null}
    </div>
  );
};

export default PieChart;
