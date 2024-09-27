import cx from 'classnames';
import dayjs from 'dayjs';
import React, { CSSProperties, useEffect, useState } from 'react';
import { history, useLocation } from 'umi';
import headerBg from './header-bg.png';
// import TabButton from '@/components/TabButton';
// import NewBreadcrumb from '@/components/NewBreadcrumb';
// import { SUNGENT_IMAGE } from '@/constants/images';
// import {
//   TAB_LIST,
//   TOP_TITLE_MAP,
//   SHOW_TAB_PATHNAME,
//   BREADCRUMB_LIST_MAP,
//   SHOW_BREADCRUMB_PATHNAME,
// } from './constants';
import { TOP_TITLE_MAP } from './constants';
import styles from './index.less';

export interface TopHeaderProps {
  style?: CSSProperties;
  className?: string;
  showDateTime?: boolean; // 是否显示时间
}

const TopHeader: React.FC<TopHeaderProps> = (props) => {
  const { style, className, showDateTime = true } = props;
  const location: any = useLocation();
  const { pathname, query } = location || {};
  
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'));

  /**
   * @description:  显示tab切换的路由
   * @param {*} useMemo
   * @return {*}
   */
  // const isTabButton = useMemo(() => {
  //   return !!SHOW_TAB_PATHNAME.includes(pathname);
  // }, [pathname]);

  /**
   * @description: 显示面包屑
   * @param {*} useMemo
   * @return {*}
   */
  // const isBreadcrumb = useMemo(() => {
  //   return !!SHOW_BREADCRUMB_PATHNAME.includes(pathname);
  // }, [pathname]);

  /**
   * @description: 顶部tab切换
   * @param {string} value
   * @return {*}
   */
  const handleTabChange = (value: string) => {
    history.push({
      pathname: value,
      query,
    });
  };

  // 获取当前时分秒
  const getCurrentTime = () => {
    setCurrentTime(dayjs().format('HH:mm:ss'));
    requestAnimationFrame(getCurrentTime);
  };

  // 获取当前年月日
  const getFullYear = () => {
    const currentYear = dayjs().format('YYYY-MM-DD');
    return currentYear;
  };

  useEffect(() => {
    getCurrentTime();
  }, []);

  return (
    <div
      className={cx(className, styles.container)}
      style={{ backgroundImage: `url(${headerBg})`, ...style }}
    >
      {/* {isBreadcrumb && (
        <NewBreadcrumb
          className={styles.breadcrumb}
          breadcrumbList={BREADCRUMB_LIST_MAP[pathname]}
        />
      )} */}
      <h2 className={cx(styles.position, styles.title)}>
        {TOP_TITLE_MAP[pathname]}
      </h2>
      {showDateTime && (
        <div className={styles.datetime}>
          <p className={styles.year}>{getFullYear()}</p>
          <p className={styles.time}>{currentTime}</p>
        </div>
      )}
      {/* {isTabButton && (
        <TabButton
          tabList={TAB_LIST}
          style={{ top: '64px' }}
          onClick={handleTabChange}
          className={styles.position}
        />
      )} */}
    </div>
  );
};

export default TopHeader;
