/*
 * :file description: 布局组件 暂时选这样写着后面再不断完善
 * :name: /sungent/src/layouts/BaseLayout.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-27 13:52:20
 * :last editor: 张德志
 * :date last edited: 2024-04-09 14:15:06
 */
import TopHeader from '@/components/TopHeader';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import styles from './BasicLayout.less';

export interface BasicLayoutProps {
  children: ReactElement | ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <TopHeader />
      {children}
    </div>
  );
};

export default BasicLayout;
