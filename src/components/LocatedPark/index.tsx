/*
 * :file description: 所在园区
 * :name: /sungent/src/components/LocatedPark/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 11:10:39
 * :last editor: 张德志
 * :date last edited: 2024-06-07 17:49:22
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import cardstyles from '@/styles/cardstyle.less';
import CommonTilte from '@/components/CommonTilte';
import LocatedParkItem from './components/LocatedParkItem';
import type { LocatedParkDataType } from './types';
import styles from './index.less';

export interface LocatedParkProps {
  style?: CSSProperties;
  className?: string;
  title: string;
  dataSource?: LocatedParkDataType[];
  //TODO 这里的any等确定字段后加
  onClick?: (values: any) => void;
}



const LocatedPark: React.FC<LocatedParkProps> = (props) => {
  const { style, className, title, dataSource, onClick} = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} className={styles.bottom} />
      {(dataSource || []).map((item, index) => {
        return (
          <LocatedParkItem
            {...item}
            currentIndex={index + 1}
            onClick={() => onClick?.({ ...item, index })}
          />
        );
      })}
    </div>
  );
};

export default LocatedPark;
