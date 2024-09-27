/*
 * :file description: 特色产业体系
 * :name: /sungent/src/components/SystemCollapse/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 14:49:51
 * :last editor: 张德志
 * :date last edited: 2024-04-30 09:40:43
 */
import React from 'react';
import { CSSProperties } from 'react';
import cx from 'classnames';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CommonTilte from '@/components/CommonTilte';
import EnterpriseInfo from './components/EnterpriseInfo';
import CollapseItem from './components/CollapseItem';
import type { SystemCollapseDataType } from './types';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface SystemCollapseProps {
  title: string;
  style?: CSSProperties;
  className?: string;
  dataSource?: SystemCollapseDataType[];
  onClick?: (value?: string) => void;
}

const SystemCollapse: React.FC<SystemCollapseProps> = (props) => {
  const { className, title, style, dataSource,onClick } = props;
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} className={styles.bottom} />
      <EnterpriseInfo className={styles.bottom} />
      <Input placeholder="请输入产业链名称搜索" prefix={<SearchOutlined />} />
      <div className={styles.collapse}>
        {(dataSource || []).map((item) => {
          return (
            <CollapseItem
              {...item}
              key={item?._id}
              className={styles.bottom}
              onClick={(value) => onClick?.(value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SystemCollapse;
