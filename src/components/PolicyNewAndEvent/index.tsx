/*
 * :file description: 政策新闻事件组件
 * :name: /sungent/src/components/PolicyNewAndEvent/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-10 09:31:34
 * :last editor: 张德志
 * :date last edited: 2024-05-11 12:02:59
 */
import React, { CSSProperties } from 'react';
import cx from 'classnames';
import { Tooltip } from 'antd';
import { SUNGENT_IMAGE } from '@/constants';
import CommonTilte from '@/components/CommonTilte';
import type { PolicyNewAndEventDataType } from './types';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface PolicyNewAndEventProps {
  title: string;
  style?: CSSProperties;
  className?: string;
  dataSource?: PolicyNewAndEventDataType[];
}

const bottomStyle = { marginBottom: 16 };

const PolicyNewAndEvent: React.FC<PolicyNewAndEventProps> = (props) => {
  const { title, dataSource, style, className } = props;

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} style={bottomStyle} />
      <div className={styles.content}>
        {(dataSource || []).map((item) => {
          return (
            <React.Fragment key={item.key}>
              <div className={styles.title}>
                <img src={SUNGENT_IMAGE.EVENT} alt={item.title} />
                <h3>{item?.title}</h3>
              </div>
              <p className={styles.desc}>
                <Tooltip placement="topLeft" title={item?.value}>
                  {item?.value}
                </Tooltip>
              </p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyNewAndEvent;
