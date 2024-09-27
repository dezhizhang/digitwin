import { OSS_URL } from '@/constants';
import * as Cesium from 'cesium';

export const defPosition = [113.3191, 23.109, 250];

// 烟光粒子特效
class ParticleLight {
  boxEntity: Cesium.Entity;
  constructor(viewer: Cesium.Viewer, options?: { position: number[] }) {
    const { position = defPosition } = options || {};
    this.boxEntity = viewer.entities.add({
      name: 'box',
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2],
      ),
      box: {
        dimensions: new Cesium.Cartesian3(100.0, 100.0, 500),
        material: Cesium.Color.RED.withAlpha(0),
      },
    });
    const particleSystem = new Cesium.ParticleSystem({
      image: `${OSS_URL}/img/smoke.png`,
      // 粒子图像大小随机
      minimumImageSize: new Cesium.Cartesian2(10, 10),
      maximumImageSize: new Cesium.Cartesian2(30, 30),
      startColor: Cesium.Color.PINK.withAlpha(1),
      // 设置结束的颜色
      endColor: Cesium.Color.WHITE.withAlpha(0),
      // 开始的时候粒子的大小
      startScale: 0.1,
      // 结束的时候粒子的大小
      endScale: 2.0,
      // 速度，米/秒
      speed: 5,
      // 随机的发射速度
      minimumSpeed: 1.0,
      // 设置随机最大发身速度
      maximumSpeed: 10.0,
      // 设置发射器
      emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(250, 250, 800)),
      // 发射率，设置每秒产生粒子数量
      emissionRate: 80,
      // 粒子的生命周期，秒
      lifetime: 5.0,
      // 设置粒子发射的位置
      modelMatrix: this.boxEntity.computeModelMatrix(
        viewer.clock.currentTime,
        new Cesium.Matrix4(),
      ),
    });

    viewer.scene.primitives.add(particleSystem);
  }
}

export default ParticleLight;
