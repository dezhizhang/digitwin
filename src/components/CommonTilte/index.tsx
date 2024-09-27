/*
 * :file description:
 * :name: /sungent/src/components/CommonTilte/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-08 17:11:11
 * :last editor: 张德志
 * :date last edited: 2024-04-10 16:52:53
 */
import React from 'react';
import cx from 'classnames';
import { CSSProperties } from 'react';
import titleIcon from '@/assets/title-icon.png';
// import { SUNGENT_IMAGE } from '@/constants';
import styles from './index.less';

export interface CommonTilteProps {
  className?: string;
  style?: CSSProperties;
  title: string;
}

const CommonTilte: React.FC<CommonTilteProps> = (props) => {
  const { className, style, title } = props;
  return (
    <div className={cx(className, styles.container)} style={style}>
      <div
        className={styles.tooltip}
        // style={{ backgroundImage: `url(${SUNGENT_IMAGE.TITLE_BG})` }}
      />

      <img className={styles.icon} src={titleIcon} alt={title} />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default CommonTilte;
