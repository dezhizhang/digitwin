/*
 * :file description: 企业侧边栏带搜索和分页
 * :name: /sungent/src/components/EnterprisesProDrawer/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-11 19:16:04
 * :last editor: 张德志
 * :date last edited: 2024-06-12 17:02:37
 */
import { Input, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { CommonResponseType } from '@/types';
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import EnterprisesItem from '@/components/EnterprisesItem';
import CommonPrimaryDrawer from '@/components/CommonPrimaryDrawer';
import EnterpriseDetailDrawer from '@/components/EnterpriseDetailDrawer';
import type { TablePaginationConfig } from 'antd/lib/table';
import {
  DEFAULT_PAGINATION,
  NORMAL_MARGIN_BOTTOM,
  PRIMARY_COLOR_NORMAL,
  RELATED_ENTERPRISES_DATA,
} from '@/constants';
import { getEnterprisesList } from './service';
import './index.less';

export interface EnterprisesProDrawerProps {
  title?: string;
  fetchRequestPromise?: (
    values: any,
  ) => Promise<CommonResponseType<any>> | Promise<any>;
}

const classNameId = `settled-enterprises`;
const classNameContentId = `${classNameId}-content`;

const marginStyle = {
  marginBottom: NORMAL_MARGIN_BOTTOM,
};

const EnterprisesProDrawer: React.FC<EnterprisesProDrawerProps> = forwardRef(
  (props, ref) => {
    const enterpriseDetailRef = useRef(null);

    const { title = '入驻企业名单', fetchRequestPromise } = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>(
      DEFAULT_PAGINATION,
    );
    const [dataSource, setDataSource] = useState(RELATED_ENTERPRISES_DATA);

    /**
     * @description: 获取企业列表
     * @return {*}
     */
    const fetchEnterprisesList = async (params: any) => {
      try {
        //setLoading(true);
        const fetchRequestHandler = fetchRequestPromise || getEnterprisesList;
        const res = await fetchRequestHandler(params);
        if (res?.stat) {
          setLoading(false);
          setDataSource(res?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleClose = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      show: (params: any) => {
        setVisible(true);
        fetchEnterprisesList(params);
      },
      close: () => handleClose(),
    }));

    return (
      <CommonPrimaryDrawer
        width={800}
        mask={false}
        open={visible}
        title={title}
        className={classNameId}
        onClose={handleClose}
      >
        <>
          <Input
            size="large"
            style={marginStyle}
            placeholder="请输入公司名"
            prefix={<SearchOutlined style={{ color: PRIMARY_COLOR_NORMAL }} />}
          />
          <div className={`${classNameContentId}`}>
            {RELATED_ENTERPRISES_DATA.map((item) => {
              return (
                <EnterprisesItem
                  {...item}
                  className={`${classNameContentId}-item`}
                  onEnterpriseClick={() =>
                    (enterpriseDetailRef as any)?.current?.show()
                  }
                />
              );
            })}
          </div>
          <div className={`${classNameId}-pagination`}>
            <Pagination {...pagination} showSizeChanger={false} total={1000} />
          </div>
        </>
        <EnterpriseDetailDrawer
          //@ts-ignore
          ref={enterpriseDetailRef}
        />
      </CommonPrimaryDrawer>
    );
  },
);

export default EnterprisesProDrawer;
