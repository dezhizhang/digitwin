import gsap from "gsap";
import * as Cesium from "cesium";
import LightWallMaterialProperty from '@/material/LightWallMaterialProperty';

// 光墙
class LightWall {
  entity: Cesium.Entity | any;
  constructor(viewer: Cesium.Viewer) {
    this.entity = viewer.entities.add({
      name: "lightWall",
      wall:{
        positions:Cesium.Cartesian3.fromDegreesArrayHeights([
            113.3051, 23.099, 200.0,
            113.3101, 23.099, 200.0,
            113.3101, 23.104, 200.0,
            113.3051, 23.104, 200.0,
            113.3051, 23.099, 200.0,
        ]),
        material:new LightWallMaterialProperty() as any
      }
    });
  }
}

export default LightWall;
