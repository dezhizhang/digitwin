import RadarMaterialProperty from '@/material/RadarMaterialProperty';
import * as Cesium from 'cesium';

export const defCoordinates = [113.3291, 23.099, 113.3391, 23.109];

// 雷达
class RadarCircleLight {
  constructor(viewer: Cesium.Viewer, options?: { coordinates: number[] }) {
    const { coordinates = defCoordinates } = options || {};
    viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(...coordinates),
        material: new RadarMaterialProperty() as any,
      },
    });
  }
}

export default RadarCircleLight;
