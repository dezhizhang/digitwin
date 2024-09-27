import BuildingBackgroundColor from '@/cesium/BuildingBackgroundColor';
import ImageryProvider from '@/cesium/ImageryProvider';
import initViewer from '@/cesium/initViewer';
import * as Cesium from 'cesium';
import React, { useEffect } from 'react';
import { CONTAINER_ID } from './constants';
import styles from './index.less';

const Guizhou: React.FC = () => {
  // 初始化cesium地图
  const initCesiumMap = () => {
    const viewer = initViewer(CONTAINER_ID);

    const position = Cesium.Cartesian3.fromDegrees(106.654548, 26.645408, 2000);

    viewer.camera.setView({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(-35),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
    });

    // 添加影像图层
    new ImageryProvider(viewer);

    // 修改建筑物颜色并添加特效
    new BuildingBackgroundColor(viewer);
  };

  useEffect(() => {
    initCesiumMap();
  }, []);

  return <div id={CONTAINER_ID} className={styles.container} />;
};

export default Guizhou;
