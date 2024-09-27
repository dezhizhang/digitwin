/*
 * :file description: 流动的水面
 * :name: /sungent/src/pages/industry-park-development/initNavigation.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 10:58:50
 * :last editor: 张德志
 * :date last edited: 2024-06-02 11:08:12
 */

import * as Cesium from 'cesium';
import CoilDiffusionMaterialProperty from '@/material/CoilDiffusionMaterialProperty';

export interface CoilDiffusionOptionType {
  color?: string;
  speed?: number;
  isedit?: boolean;
  maxRadius?: number;
}

class CoilDiffusion {
  constructor(viewer: Cesium.Viewer, options?: CoilDiffusionOptionType) {
    const { color, speed, isedit = false, maxRadius = 1200 } = options || {};
    viewer.entities.add({
      id: 'CoilDiffusion',
      position: Cesium.Cartesian3.fromDegrees(113.31922, 23.12071, 0),
      ellipse: {
        semiMinorAxis: maxRadius,
        semiMajorAxis: maxRadius,
        material: new CoilDiffusionMaterialProperty(
          'CoilDiffusionMaterialProperty',
          color,
          speed,
        ) as any,
      },
    });
  }
}

export default CoilDiffusion;
