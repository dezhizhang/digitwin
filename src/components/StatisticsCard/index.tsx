/*
 * :file description: 统计类组件
 * :name: /sungent/src/components/StatisticsCard/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 14:17:13
 * :last editor: 张德志
 * :date last edited: 2024-06-07 15:37:40
 */
import cx from 'classnames';
import { useSize } from 'ahooks';
import React, { useRef } from 'react';
import { MutableRefObject } from 'react';
import { CSSProperties } from 'react';
import { NORMAL_MARGIN_BOTTOM } from '@/constants';
import CommonTilte from '@/components/CommonTilte';
import type { StatisticsDataType } from './types';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface StatisticsCardItemProps extends StatisticsDataType {
  width: number;
  onStatisticsClick?: () => void;
}
const StatisticsCardItem: React.FC<StatisticsCardItemProps> = (props) => {
  const { key, width, title, value, unit, onStatisticsClick } = props;
  return (
    <div
      key={key}
      onClick={() => onStatisticsClick?.()}
      className={styles.item}
      style={{ width: width }}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>
        {value}
        {unit ? <span>{unit}</span> : null}
      </p>
    </div>
  );
};

export interface StatisticsCardProps {
  title: string;
  className?: string;
  style?: CSSProperties;
  dataSource: StatisticsDataType[];
  onStatisticsClick?: (values: StatisticsDataType) => void;
}
const bottomStyle = { marginBottom: 16 };

const StatisticsCard: React.FC<StatisticsCardProps> = (props) => {
  const { className, style, title, dataSource, onStatisticsClick } = props;

  const contentRef = useRef<MutableRefObject<HTMLDivElement> | any>();
  const contentWidth = useSize(contentRef);
  const width =
    (Number(contentWidth?.width) - NORMAL_MARGIN_BOTTOM * 2) / 2 || 0;

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} style={bottomStyle} />
      <div className={styles.content} ref={contentRef}>
        {(dataSource || []).map((item) => {
          return (
            <StatisticsCardItem
              width={width}
              {...item}
              onStatisticsClick={() => onStatisticsClick?.(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsCard;
