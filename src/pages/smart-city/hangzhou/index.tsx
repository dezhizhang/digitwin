import BuildingBackgroundColor from '@/cesium/BuildingBackgroundColor';
import DotCircleDiffusion from '@/cesium/DotCircleDiffusion';
import HandlerInputAction from '@/cesium/HandlerInputAction';
import HexagonLightDiffusion from '@/cesium/HexagonLightDiffusion';
import ImageryProvider from '@/cesium/ImageryProvider';
import initViewer from '@/cesium/initViewer';
import ParticleLight from '@/cesium/ParticleLight';
import RadarCircleLight from '@/cesium/RadarCircleLight';
import ReactFlyLight from '@/cesium/ReactFlyLight';
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

const Hangzhou: React.FC = () => {
  const initCesiumMap = () => {
    const viewer = initViewer(containerId);

    const position = Cesium.Cartesian3.fromDegrees(120.237728, 30.18867, 2000);

    viewer.camera.setView({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(-40),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
    });

    new BuildingBackgroundColor(viewer);

    // new Cesium3DTileset(viewer, {
    //   url: `${OSS_URL}/tileset/shenzhen-tileset.json`,
    // });

    new HandlerInputAction(viewer);
    // 流光飞线
    new ReactFlyLight(viewer, {
      bbox: [120.177543, 30.19229, 120.250804, 30.218749],
    });

    // 添加影像图层
    new ImageryProvider(viewer);

    // 添加道路线
    // new RoadLightLine(viewer, {
    //   url: `${OSS_URL}/geojson/shenzhen-nanshan.geojson`,
    // });

    // 圆形扩散线
    new DotCircleDiffusion(viewer, {
      position: [120.206513, 30.261169, 0],
    });
    // 水波纹扩散
    new WaveCircleSpread(viewer, {
      position: [120.216255, 30.211091, 0],
    });
    // 粒子特效
    new ParticleLight(viewer, {
      position: [120.232975, 30.229902, 0],
    });
    // 雷达几何体
    new RadarCircleLight(viewer, {
      coordinates: [120.214004, 30.217256, 120.220421, 30.221842],
    });

    // 六边形扩散
    new HexagonLightDiffusion(
      viewer,
      {
        minLot: 113.920873,
        minLat: 22.511049,
        maxLot: 113.926043,
        maxLat: 22.51466,
      },
      {
        minLot: 113.918873,
        minLat: 22.510049,
        maxLot: 113.929043,
        maxLat: 113.929043,
      },
    );
  };

  useEffect(() => {
    initCesiumMap();
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

export default Hangzhou;
