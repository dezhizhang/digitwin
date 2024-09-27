/*
 * :file description: 企业详情弹框
 * :name: /sungent/src/components/EnterpriseDetailDrawer/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-06 16:11:30
 * :last editor: 张德志
 * :date last edited: 2024-06-11 20:53:10
 */
import Iframe from 'react-iframe';
import { Divider,Drawer} from 'antd';
import { CloseOutlined, FullscreenOutlined } from '@ant-design/icons';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './index.less';

const iconStyle = {
  color: '#fff',
  fontSize: 20,
};

const dividerStyle = {
  margin: '16px 0',
  height: '2px',
  background: 'hsla(0,0%,100%,.2)',
};

export interface EnterpriseDetailDrawerProps {}

export const classNameId = 'enterprise-detail-drawer';

const EnterpriseDetailDrawer: React.FC<EnterpriseDetailDrawerProps> = forwardRef(
  (props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    }));

    const handleClose = () => {
      setVisible(false);
    };
    
    return (
      <Drawer
        title=""
        placement="right"
        open={visible}
        width={1200}
        mask={false}
        onClose={handleClose}
        rootClassName={classNameId}
      >
        <div className={`${classNameId}-close`}>
          <div className={`${classNameId}-close-box`}>
            <CloseOutlined style={iconStyle} onClick={handleClose} />
            <Divider type="horizontal" style={dividerStyle} />
            <FullscreenOutlined style={iconStyle} />
          </div>
        </div>
        <Iframe
          url={`/enterprise-details/37622ffc7dbf3fe3?fromOutside=estateIframe`}
          className={`${classNameId}-iframe`}
          display="block"
          position="relative"
          frameBorder={0}
        />
      </Drawer>
    );
  },
);

export default EnterpriseDetailDrawer;
