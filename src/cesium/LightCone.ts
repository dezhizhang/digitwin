import gsap from "gsap";
import * as Cesium from "cesium";
import { OSS_URL } from "@/constants";

// 动态光堆
class LightCone {
  model: Cesium.Model;
  modelMatrix: Cesium.Matrix4;
  options: { height: number; degress: number };
  constructor(viewer: Cesium.Viewer) {
    this.options = {
      height: 700,
      degress: 0,
    };

    this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.options.height),
      new Cesium.HeadingPitchRoll(this.options.degress, 0, 0)
    );

    // 添加模型
    this.model = viewer.scene.primitives.add(
      Cesium.Model.fromGltf({
        url: `${OSS_URL}/model/pyramid1.glb`,
        show: true,
        scale: 200,
        minimumPixelSize: 12,
        maximumScale: 20000,
        // 是否可以点击
        allowPicking: false,
        debugShowBoundingVolume: false,
        debugWireframe: false,
        color: Cesium.Color.YELLOW.withAlpha(0.5),
        // 设置混合模式
        colorBlendMode: Cesium.ColorBlendMode.MIX,
        modelMatrix: this.modelMatrix,
      })
    );
    this.animate();
  }
  animate() {
    gsap.to(this.options, {
      height: 800,
      degress: Math.PI,
      yoyo: true,
      repeat: -1,
      direction: 1,
      ease: "power1.inOut",
      onUpdate: () => {
        this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.options.height),
          new Cesium.HeadingPitchRoll(this.options.degress, 0, 0)
        );
      },
    });
  }
}

export default LightCone;
