import BuildingBackgroundColor from '@/cesium/BuildingBackgroundColor';
import handlerInputAction from '@/cesium/HandlerInputAction';
import ImageryProvider from '@/cesium/ImageryProvider';
import initViewer from '@/cesium/initViewer';
import ParticleLight from '@/cesium/ParticleLight';
import WaveCircleSpread from '@/cesium/WaveCircleSpread';
import RadarCircleLight from '@/cesium/RadarCircleLight';
import DotCircleDiffusion from '@/cesium/DotCircleDiffusion';
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

const Beijing: React.FC = () => {
  // 初始化地图
  const initCesium3DMap = () => {
    const viewer = initViewer(containerId);

    const position = Cesium.Cartesian3.fromDegrees(
      // 经度
      116.458448,
      // 纬度
      39.877838,
      // 高度
      2500,
    );

    viewer.camera.setView({
      destination: position,
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0,
      },
    });

    new handlerInputAction(viewer);

    // 添加影像图层
    new ImageryProvider(viewer);

    // 修改建筑物颜色并添加特效
    new BuildingBackgroundColor(viewer);

    new ParticleLight(viewer, {
      position: [116.460236,39.91116, 0],
    });

    // 圆形扩散线
    new DotCircleDiffusion(viewer, {
      position: [116.447017, 39.930628, 0],
    });

    // 水波纹扩散特效
    new WaveCircleSpread(viewer, {
      position: [116.456113, 39.910137, 0],
    });

    // 雷达特效
    new RadarCircleLight(viewer, {
      coordinates: [121.488922, 31.249933, 121.493143, 31.254158],
    });
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

export default Beijing;
