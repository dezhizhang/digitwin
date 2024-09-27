/*
 * :file description: 公共侧边栏弹框
 * :name: /sungent/src/components/CommonPrimaryDrawer/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-12 10:05:34
 * :last editor: 张德志
 * :date last edited: 2024-06-12 16:08:59
 */
import { Drawer } from 'antd';
import cx from 'classnames';
import React, { CSSProperties } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import CommonTilte from '@/components/CommonTilte';
import type { DrawerProps } from 'antd/lib/drawer';
import './index.less';

export interface CommonPrimaryDrawerProps extends DrawerProps {
  style?: CSSProperties;
  children: React.ReactNode | React.ReactElement;
  className?: string;
  loading?: boolean;
  title: string;
  open: boolean;
  onClose?: () => void;
}

const classPrefix = 'common-primary-drawer';

const classPrefixTitle = `${classPrefix}-title`;

const CommonPrimaryDrawer: React.FC<CommonPrimaryDrawerProps> = (props) => {
  const {
    width = 800,
    children,
    open = false,
    mask = false,
    loading = false,
    onClose,
    title = '涉及产业链数',
    className,
    style,
  } = props;

  const renderTitle = () => {
    return (
      <div className={classPrefixTitle}>
        <CommonTilte title={title} />
        <CloseCircleOutlined
          onClick={() => onClose?.()}
          className={`${classPrefixTitle}-close`}
        />
      </div>
    );
  };

  return (
    <Drawer
      mask={mask}
      width={width}
      style={style}
      open={open}
      title={renderTitle()}
      loading={loading}
      onClose={() => onClose?.()}
      closeIcon={null}
      className={cx(className, classPrefix)}
    >
      {children}
    </Drawer>
  );
};

export default CommonPrimaryDrawer;
