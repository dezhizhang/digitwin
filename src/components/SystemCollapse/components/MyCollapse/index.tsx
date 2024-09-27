/*
 * :file description:
 * :name: /sungent/src/components/SystemCollapse/components/MyCollapse/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 15:00:53
 * :last editor: 张德志
 * :date last edited: 2024-04-30 09:37:30
 */
import React, { useState } from 'react';
import cx from 'classnames';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import type { CSSProperties } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import CollapseText from '../CollapseText';
import type { SystemCollapseDataType } from '../../types';
import styles from './index.less';

export interface MyCollapseProps extends SystemCollapseDataType {
  style?: CSSProperties;
  className?: string;
  onClick?: (value?: string) => void;
}

const MyCollapse: React.FC<MyCollapseProps> = (props) => {
  const {
    style,
    _id,
    label,
    count,
    children,
    className,
    group_label,
    onClick,
  } = props;

  const [collapseActive, setCollapseActive] = useState<boolean>(false);

  const items: CollapseProps['items'] = [
    {
      key: _id,
      label: (
        <div className={styles.header}>
          <h5 className={styles.title}>
            {label}&nbsp;<span>({count})</span>
          </h5>
          <div className={styles.right}>
            <span className={styles.tag}>{group_label}</span>
            <span className={styles.triangle} />
          </div>
        </div>
      ),
      children: (
        <>
          {(children || []).map((item) => {
            return (
              <CollapseText
                {...item}
                key={item?._id}
                onClick={() => onClick?.(item._id)}
              />
            );
          })}
        </>
      ),
    },
  ];
  return (
    <div style={style} className={cx(className, styles.container)}>
      <Collapse
        items={items}
        bordered={false}
        expandIconPosition="end"
        className={collapseActive ? 'collapseActive' : ''}
        expandIcon={({ isActive }) => {
          setCollapseActive(isActive as boolean);
          return <CaretRightOutlined rotate={isActive ? 90 : 0} />;
        }}
      />
    </div>
  );
};

export default MyCollapse;
