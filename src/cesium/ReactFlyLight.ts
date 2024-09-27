import PolylineTrailMaterialProperty from '@/material/PolylineTrailMaterialProperty';
import * as turf from '@turf/turf';
import * as Cesium from 'cesium';

// 创建区域流光线

export const defBbox = [113.261, 23.014, 113.3691, 23.159];

class ReactFlyLight {
  bbox: number[];
  constructor(viewer: Cesium.Viewer, options?: { bbox: number[] }) {
    this.bbox = options?.bbox || defBbox;

    // 随机生成点
    const points = (turf as any).randomPoint(500, { bbox: this.bbox });

    const { features } = points || {};
    (features || []).forEach((item: any) => {
      const { coordinates } = item.geometry || {};

      const start = Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1],
        1,
      );
      // 随机生成线的高度
      const height = 200 + Math.random() * 1000;
      const end = Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1],
        height,
      );

      viewer.entities.add({
        polyline: {
          positions: [start, end],
          width: 2,
          // material:Cesium.Color.RED,
          material: new PolylineTrailMaterialProperty() as any,
        },
      });
    });
  }
}

export default ReactFlyLight;
