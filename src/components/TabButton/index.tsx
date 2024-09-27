/*
 * :file description:
 * :name: /sungent/src/components/TabButton/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-11 09:30:57
 * :last editor: 张德志
 * :date last edited: 2024-04-11 17:58:11
 */
import cx from 'classnames';
import { useLocation } from 'umi';
import React from 'react';
import { CSSProperties } from 'react';
import type { TabListType } from './types';
import { SUNGENT_IMAGE } from '@/constants';
import styles from './index.less';

export interface TabButtonProps {
  style?: CSSProperties;
  className?: string;
  tabList: TabListType[];
  onClick: (value: string) => void;
  tabStyle?: CSSProperties;
  getTabBackground?: (value: string, index: number) => string;
}

const TabButton: React.FC<TabButtonProps> = (props) => {
  const {
    className,
    style,
    tabList,
    onClick,
    getTabBackground,
    tabStyle,
  } = props;

  const location = useLocation();
  const { pathname } = location || {};

  /**
   * @description: 计算tab背景图片
   * @param {string} currentTab
   * @param {number} index
   * @return {*}
   */
  const getBackgroundUrl = (currentTab: string, index: number) => {
    const {
      TAB_LEFT,
      TAB_RIGHT,
      TAB_LEFT_ACTIVE,
      TAB_RIGHT_ACTIVE,
    } = SUNGENT_IMAGE;
    if (currentTab !== pathname && !index) {
      return TAB_LEFT;
    } else if (currentTab === pathname && !index) {
      return TAB_LEFT_ACTIVE;
    } else if (currentTab !== pathname && index) {
      return TAB_RIGHT;
    } else if (currentTab === pathname && index) {
      return TAB_RIGHT_ACTIVE;
    }
  };

  return (
    <div style={style} className={cx(className, styles.container)}>
      {(tabList || []).map((item, index) => {
        const isActive = item.value === pathname;
        return (
          <div
            className={cx(styles.item)}
            style={{
              backgroundImage: `url(${
                getTabBackground?.(item.value, index) ||
                getBackgroundUrl(item.value, index)
              })`,
              backgroundPositionX: !index ? 18 : -18,
              fontWeight: isActive ? 600 : 'normal',
              color: isActive ? '#fff' : 'normal',
              ...tabStyle,
            }}
            key={item?.value}
            onClick={() => onClick?.(item?.value)}
          >
            {item?.label}
          </div>
        );
      })}
    </div>
  );
};

export default TabButton;
