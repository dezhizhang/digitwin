import WaveDiffusionMaterialProperty from '@/material/WaveDiffusionMaterialProperty';
import * as Cesium from 'cesium';
import gsap from 'gsap';

export const defCoordinates = {
  minLot: 113.3091,
  minLat: 23.119,
  maxLot: 113.3141,
  maxLat: 23.124,
};

export interface CoordinatesType {
  minLot: number;
  minLat: number;
  maxLot: number;
  maxLat: number;
}

// 六边形扩散
class HexagonLightDiffusion {
  coordinates: CoordinatesType;
  toCoordinates: CoordinatesType;

  entitie: Cesium.Entity | any;
  constructor(
    viewer: Cesium.Viewer,
    coordinates: CoordinatesType,
    toCoordinates: CoordinatesType,
  ) {
    this.coordinates = coordinates || defCoordinates;
    this.toCoordinates = toCoordinates;
    const { minLot, minLat, maxLot, maxLat } = coordinates;

    this.entitie = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          minLot,
          minLat,
          maxLot,
          maxLat,
        ),
        material: new WaveDiffusionMaterialProperty() as any,
      },
    });
    this.animation();
  }
  animation() {
    const that = this;
    const { minLot, minLat, maxLot, maxLat } = that.coordinates;
    gsap.to(this.coordinates, {
      ...that.toCoordinates,
      duration: 3,
      repeat: -1,
      ease: 'linear',
      onUpdate: () => {
        this.entitie.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
          minLot,
          minLat,
          maxLot,
          maxLat,
        );
      },
    });
  }
}

export default HexagonLightDiffusion;
