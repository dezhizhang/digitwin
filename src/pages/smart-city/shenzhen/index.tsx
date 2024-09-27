import Cesium3DTileset from '@/cesium/Cesium3DTileset';
import DotCircleDiffusion from '@/cesium/DotCircleDiffusion';
import handlerInputAction from '@/cesium/HandlerInputAction';
import HexagonLightDiffusion from '@/cesium/HexagonLightDiffusion';
import ImageryProvider from '@/cesium/ImageryProvider';
import initViewer from '@/cesium/initViewer';
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
import { OSS_URL } from '@/constants';
import layouts from '@/styles/layoutstyle.less';
import * as Cesium from 'cesium';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { containerId, LOCATED_PARK_DATA } from './constants';
import styles from './index.less';

// 深圳数字孪生
const legendData = ['政企通', '政展通', '来电', '12345转办'];
const xAxisData = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

const Shenzhen: React.FC = () => {
  const initCesiumMap = () => {
    const viewer = initViewer(containerId);

    const position = Cesium.Cartesian3.fromDegrees(120.236174, 30.221671, 2000);

    viewer.camera.setView({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
    });

    new Cesium3DTileset(viewer, {
      url: `${OSS_URL}/tileset/shenzhen-tileset.json`,
    });

    new handlerInputAction(viewer);
    // 流光飞线
    new ReactFlyLight(viewer, {
      bbox: [113.912465, 22.521905, 113.951252, 22.497347],
    });

    // 添加影像图层
    new ImageryProvider(viewer);

    // 添加道路线
    new RoadLightLine(viewer, {
      url: `${OSS_URL}/geojson/shenzhen-nanshan.geojson`,
    });

    // 圆形扩散线
    new DotCircleDiffusion(viewer, {
      position: [113.94858, 22.54026, 0],
    });
    // 水波纹扩散
    new WaveCircleSpread(viewer, {
      position: [113.933267, 22.517313, 0],
    });
    // 粒子特效
    new ParticleLight(viewer, {
      position: [113.943073, 22.525134, 0],
    });
    // 雷达几何体
    new RadarCircleLight(viewer, {
      coordinates: [113.922465, 22.521905, 113.92943, 22.529187],
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

export default Shenzhen;
