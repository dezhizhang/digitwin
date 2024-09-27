/*
 * :file description:
 * :name: /sungent/src/components/NewBreadcrumb/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-07 13:49:45
 * :last editor: 张德志
 * :date last edited: 2024-05-07 17:47:40
 */
import React from 'react';
import cx from 'classnames';
import { history } from 'umi';
import { Breadcrumb } from 'antd';
import type { CSSProperties } from 'react';
import type { BreadcrumbListDataType } from './types';
import styles from './index.less';

export interface NewBreadcrumbProps {
  className?: string;
  style?: CSSProperties;
  breadcrumbList?: BreadcrumbListDataType[];
}

const BreadcrumbItem = Breadcrumb.Item;

const NewBreadcrumb: React.FC<NewBreadcrumbProps> = (props) => {
  const { style, className, breadcrumbList } = props;
  return (
    <div style={style} className={cx(className, styles.container)}>
      <Breadcrumb>
        {(breadcrumbList || []).map((item) => {
          return item?.isLink ? (
            <BreadcrumbItem
              key={item.name}
              className={cx(styles.breadcrumb, styles.breadcrumb2)}
              // TODO没有回调给调用者后面有需求再提给调用者
              onClick={() => history.push(item.backUrl as string)}
            >
              <a role="button">{item.name}</a>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem
              key={item.name} 
              className={cx(styles.breadcrumb, styles.breadcrumb1)}
            >
              {item.name}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default NewBreadcrumb;
