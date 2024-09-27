import BuildingBackgroundColor from '@/cesium/BuildingBackgroundColor';
import CoilDiffusion from '@/cesium/CoilDiffusion';
import DotCircleDiffusion from '@/cesium/DotCircleDiffusion';
import HandlerInputAction from '@/cesium/HandlerInputAction';
import ImageryProvider from '@/cesium/ImageryProvider';
import initViewer from '@/cesium/initViewer';
import LightCone from '@/cesium/LightCone';
import LightWall from '@/cesium/LightWall';
import ParticleLight from '@/cesium/ParticleLight';
import RadarCircleLight from '@/cesium/RadarCircleLight';
import ReactFlyLight from '@/cesium/ReactFlyLight';
import RoadLightLine from '@/cesium/RoadLightLine';
import WaveCircleSpread from '@/cesium/WaveCircleSpread';
import AreaStackGradient from '@/components/AreaStackGradient';
import DatasetChart from '@/components/DatasetChart';
import LocatedPark from '@/components/LocatedPark';
import PieRoseChart from '@/components/PieRoseChart';
import ProportionAnalysis from '@/components/ProportionAnalysis';

import layouts from '@/styles/layoutstyle.less';
import * as Cesium from 'cesium';
import cx from 'classnames';

import React, { useEffect } from 'react';
import { containerId, LOCATED_PARK_DATA } from './constants';
import styles from './index.less';

const legendData = ['政企通', '政展通', '来电', '12345转办'];
const xAxisData = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

const Guangzhou: React.FC = () => {
  // 初始化地图
  const initCesium3DMap = () => {
    const viewer = initViewer(containerId);

    const position = Cesium.Cartesian3.fromDegrees(
      // 经度
      113.324,
      // 纬度
      23.0926,
      // 高度
      2000,
    );

    viewer.camera.setView({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(-10),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
    });

    // 初始化鼠标事件
    new HandlerInputAction(viewer);

    // 添加影像图层
    new ImageryProvider(viewer);
    // 修改建筑物颜色并添加特效
    new BuildingBackgroundColor(viewer);

    //
    new LightCone(viewer);
    // 创建矩形飞线
    new ReactFlyLight(viewer);
    // 创建道路线
    new RoadLightLine(viewer);
    // 创建雷达
    new RadarCircleLight(viewer);
    // 光波扩散
    // new LightWaveDiffusion(viewer);
    // 光墙
    new LightWall(viewer);
    // 粒子特效
    new ParticleLight(viewer);
    // 圆形扩散特效
    new DotCircleDiffusion(viewer, {
      position: [113.32728, 23.12472, 0],
    });
    // 水波纹扩散特效
    new WaveCircleSpread(viewer);
    // 圆扩散特效
    new CoilDiffusion(viewer);
  };

  useEffect(() => {
    initCesium3DMap();
  }, []);

  return (
    <div className={cx(layouts.wrapper, styles.container)}>
      <div className={cx(layouts.sidebar, layouts.sidebarleft)}>
        <ProportionAnalysis title="事件完成占比" className={styles.bottom} />
        <LocatedPark title="事件处理进度" dataSource={LOCATED_PARK_DATA} />
      </div>
      <div id={containerId} className={styles.scene} />
      <div className={cx(layouts.sidebar, layouts.sidebarright)}>
        <DatasetChart className={styles.bottom} />
        <PieRoseChart className={styles.bottom} />
        <AreaStackGradient
          style={{}}
          dataSource={{
            legendData,
            xAxisData,
          }}
          className={styles.bottom}
          title={'近30天事件趋势图'}
        />
      </div>
    </div>
  );
};

export default Guangzhou;
