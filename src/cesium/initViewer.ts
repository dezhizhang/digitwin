
import * as Cesium from 'cesium';
import { setOneimageryProvider } from '@/utils';
import { ACCESS_TOKEN, MAP_IMAGERY_LIST, OSS_URL } from '@/constants';
// window.Ces

(window as any).CESIUM_BASE_URL = `${OSS_URL}/`;

// 初始化cesiumViwer
function initViwer(containerId: string) {
  Cesium.Ion.defaultAccessToken = ACCESS_TOKEN;
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西边的经度
    89.5,
    // 南边的经度
    20.4,
    // 东边的经度
    110.4,
    // 北边的经度
    61.2,
  );

  const viewer = new Cesium.Viewer(containerId, {
    infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    // 不显示home按钮
    homeButton: false,
    // 控制查看器显示模式
    sceneModePicker: false,
    // 是否显示图层按钮
    baseLayerPicker: false,
    // 是否显不帮助
    navigationHelpButton: false,
    // 是否显示动画
    animation: false,
    // 是否显示全屏按钮
    timeline: false,
    fullscreenButton: false,
    // 是否显示动画
    shouldAnimate: true,
    // 添加影像图层
    imageryProvider: setOneimageryProvider(MAP_IMAGERY_LIST[0]),
  });

  viewer.scene.globe.enableLighting = true;
  // 取消天空盒显示
  viewer.scene.skyBox.show = false;
  // 设置背景为黑色
  // viewer.scene.backgroundColor = Cesium.Color.BLACK;
  // 设置抗锯齿
  viewer.scene.postProcessStages.fxaa.enabled = true;
  // 设置开启深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;
  // 开启水面后期处理
  viewer.scene.globe.showWaterEffect = true;
  

  return viewer;
}

export default initViwer;
