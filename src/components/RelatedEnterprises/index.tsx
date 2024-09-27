/*
 * :file description:
 * :name: /sungent/src/components/RelatedEnterprises/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-15 09:24:44
 * :last editor: 张德志
 * :date last edited: 2024-06-11 19:27:44
 */
import cx from 'classnames';
import { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';
import SwiperCore, * as SwiperEntity from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommonTilte from '@/components/CommonTilte';
import type { RelatedEnterprisesDataType } from './types';
import EnterprisesItem from '@/components/EnterprisesItem';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

const { Autoplay, Navigation, Pagination } = SwiperEntity;

SwiperCore.use([Autoplay, Navigation, Pagination]);

export interface RelatedEnterprisesProps {
  className?: string;
  style?: CSSProperties;
  title: string;
  dataSource?: RelatedEnterprisesDataType[];
  onEnterpriseClick?: (values: RelatedEnterprisesDataType) => void;
}

const RelatedEnterprises: React.FC<RelatedEnterprisesProps> = (props) => {
  const { title, className, style, dataSource, onEnterpriseClick } = props;

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <div className={styles.title}>
        <CommonTilte title={title} />
      </div>
      <div className={styles.content}>
      <Swiper
        className={styles.swiper}
        speed={2000}
        freeMode={true}
        spaceBetween={0}
        slidesPerView={2}
        direction="vertical"
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {(dataSource || []).map((item) => {
          return (
            <SwiperSlide key={item?.key} className={styles.swiperslide}>
              <EnterprisesItem
                {...item}
                onEnterpriseClick={() => onEnterpriseClick?.(item)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      </div>
 
    </div>
  );
};

export default RelatedEnterprises;
