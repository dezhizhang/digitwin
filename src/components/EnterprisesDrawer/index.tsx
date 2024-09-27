/*
 * :file description: 企业侧边栏组件
 * :name: /sungent/src/components/EnterprisesDrawer/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-11 20:50:45
 * :last editor: 张德志
 * :date last edited: 2024-06-12 16:59:00
 */
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { CommonResponseType } from '@/types';
import { RELATED_ENTERPRISES_DATA } from '@/constants';
import EnterprisesItem from '@/components/EnterprisesItem';
import EnterpriseDetailDrawer from '@/components/EnterpriseDetailDrawer';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import CommonPrimaryDrawer from '@/components/CommonPrimaryDrawer';
import { getEnterprisesList } from './service';
import './index.less';

const classPrefix = `campsites-operation-drawer`;
const classPrefixContent = `${classPrefix}-content`;

export interface EnterprisesDrawerProps {
  title?: string;
  className?: string;
  style?: CSSProperties;
  // TODO values后期接口文档补充
  fetchRequestPromise?: (
    values: any,
  ) => Promise<CommonResponseType<any>> | Promise<any>;
}

const EnterprisesDrawer: React.FC<EnterprisesDrawerProps> = forwardRef(
  (props, ref) => {
    const enterpriseDetailRef = useRef(null);

    const { title = '在营园区总数', className, fetchRequestPromise } = props;
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState(RELATED_ENTERPRISES_DATA);

    const handleClose = () => {
      setVisible(false);
      // TODO 后期加回去
      // setDataSource([]);
    };

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

    /**
     * @description:  提供对外的方法
     * @param {*} ref
     * @return {*}
     */
    useImperativeHandle(ref, () => ({
      // TODO参数后期文档出完补齐
      show: (params: any) => {
        setVisible(true);
        fetchEnterprisesList(params);
      },
      close: () => {
        handleClose();
      },
    }));

    return (
      <CommonPrimaryDrawer
        open={visible}
        mask={false}
        width={800}
        title={title}
        loading={loading}
        onClose={handleClose}
        className={classPrefix}
      >
        <div className={cx(className, classPrefixContent)}>
          {(dataSource || []).map((item) => {
            return (
              <EnterprisesItem
                {...item}
                onEnterpriseClick={() =>
                  (enterpriseDetailRef as any)?.current?.show()
                }
                className={`${classPrefixContent}-item`}
              />
            );
          })}
        </div>
        <EnterpriseDetailDrawer
          //@ts-ignore
          ref={enterpriseDetailRef}
        />
      </CommonPrimaryDrawer>
    );
  },
);

export default EnterprisesDrawer;
