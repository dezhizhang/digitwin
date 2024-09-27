/*
 * :file description:
 * :name: /sungent/src/components/ParkDisplay/components/ParkDisplayItem/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 11:02:32
 * :last editor: 张德志
 * :date last edited: 2024-04-18 14:22:50
 */
import React from 'react';
import cx from 'classnames';
import { Button } from 'antd';
import { CSSProperties } from 'react';
import Tag from '@/components/Tag';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

export interface ParkDisplayItemProps {
  className?: string;
  style?: CSSProperties;
}

const tagStyle = {
  marginRight: 8,
  marginBottom: 8,
};

const ParkDisplayItem: React.FC<ParkDisplayItemProps> = (props) => {
  const { className, style } = props;
  const tags = ['仓储AGV'];
  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.circle} />
          <h4 className={styles.title}>2.5产业园区 （114家）</h4>
        </div>
        <Button className={styles.btn}>园区详情</Button>
      </div>
      <div className={styles.content}>
        <div className={styles.box}>
          <img
            src="https://tugua.oss-cn-hangzhou.aliyuncs.com/website/1699924942918.jpeg"
            alt=""
            className={styles.img}
          />
          <div className={styles.tags}>
            {(tags || []).map((item) => {
              return <Tag name={item} style={tagStyle} />;
            })}
          </div>
        </div>
        <div className={styles.description}>
          苏州2.5产业园位于苏州工业园区湖东中轴核心地带，作为中国—新加坡苏州工业园区“积极培育新兴产业增长点”的重点项目，以企业管理咨询服务、财务数据处理、技术研发服务和金融后台支持的四大产业平台为布局，为园区实体经济打造卓越载
        </div>
      </div>
    </div>
  );
};

export default ParkDisplayItem;
