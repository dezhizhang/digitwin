/*
 * :file description: 每一列产业链
 * :name: /sungent/src/components/SystemCollapse/components/CollapseItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 19:58:07
 * :last editor: 张德志
 * :date last edited: 2024-04-30 09:38:55
 */
import React, { useMemo } from 'react';
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import MyCollapse from '../MyCollapse';
import cardstyles from '@/styles/cardstyle.less';
import type { SystemCollapseDataType } from '../../types';
import styles from './index.less';

export interface CollapseItemProps extends SystemCollapseDataType {
  className?: string;
  style?: CSSProperties;
  onClick?: (value?: string) => void;
}

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  const { className, style, label, _id, count, children, onClick } = props;

  /**
   * @description: 转换产业链数据结构
   * @param {*} useMemo
   * @return {*}
   */
  const myCollapseList = useMemo(() => {
    const collapseList: SystemCollapseDataType[] = [];
    (children || []).forEach((group: SystemCollapseDataType) => {
      const { label, _id } = group || {};
      (group?.children || []).forEach((item) => {
        collapseList.push({ ...item, group_label: label, group_id: _id });
      });
    });
    return collapseList;
  }, [children]);

  const items: CollapseProps['items'] = [
    {
      key: _id,
      label: (
        <h4 className={styles.title}>
          {label}&nbsp;<span>({count})</span>
        </h4>
      ),
      children: (
        <>
          {myCollapseList.map((item) => {
            return (
              <MyCollapse
                {...item}
                key={item?._id}
                onClick={(value) => onClick?.(value)}
              />
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <Collapse
        items={items}
        bordered={false}
        expandIconPosition="end"
        defaultActiveKey={[`${_id}`]}
        expandIcon={({ isActive }) => {
          return <CaretRightOutlined rotate={isActive ? 90 : 0} />;
        }}
      />
    </div>
  );
};

export default CollapseItem;
