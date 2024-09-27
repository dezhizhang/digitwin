/*
 * :file description: 水波纹圆形扩散特效
 * :name: /sungent/src/pages/industry-park-development/initNavigation.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 10:58:50
 * :last editor: 张德志
 * :date last edited: 2024-06-02 11:08:12
 */

import WaveMaterialProperty from '@/material/WaveMaterialProperty';
import * as Cesium from 'cesium';

export const defPosition = [113.319337, 23.108738, 0];

class WaveCircleSpread {
  entity: Cesium.Entity;
  constructor(viewer: Cesium.Viewer, options?: { position: number[] }) {
    const { position = defPosition } = options || {};
    const cssColor = Cesium.Color.fromCssColorString(
      'rgba(31, 168, 227, 0.59)' as string,
    );
    this.entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2],
      ),
      ellipse: {
        semiMinorAxis: 600,
        semiMajorAxis: 600,
        material: new WaveMaterialProperty() as any,
      },
    });
  }
}

export default WaveCircleSpread;
