/*
 * :file description: 园区展示
 * :name: /sungent/src/components/ParkDisplay/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 10:48:20
 * :last editor: 张德志
 * :date last edited: 2024-05-08 14:29:46
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import cardstyles from '@/styles/cardstyle.less';
import CommonTilte from '@/components/CommonTilte';
import ParkDisplayItem from '@/components/ParkDisplayItem';
import styles from './index.less';

export interface ParkDisplayProps {
  title?: string;
  className?: string;
  style?: CSSProperties;
  showTitle?: boolean;
  dataSource?: any[];
}

const ParkDisplay: React.FC<ParkDisplayProps> = (props) => {
  const { title, className, style, dataSource, showTitle = true } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      {showTitle ? (
        <CommonTilte title={title as string} className={styles.title} />
      ) : null}

      {(dataSource || []).map((item) => {
        return <ParkDisplayItem {...item} key={item.key} />;
      })}
      <ParkDisplayItem />
    </div>
  );
};

export default ParkDisplay;
