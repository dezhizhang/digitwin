import * as Cesium from "cesium";
import gsap from "gsap";
import { OSS_URL } from '@/constants';

// 精灵线
class SpriteLineMaterialProperty {
  options: { uTime: number };
  definitionChanged: Cesium.Event;
  constructor() {
    this.options = {
      uTime: 0,
    };
    this.definitionChanged = new Cesium.Event();
    (Cesium.Material as any)._materialCache.addMaterial(
      "SpriteLineMaterialProperty",
      {
        fabric: {
          type: "SpriteLineMaterialProperty",
          uniforms: {
            uTime: 0,
            image: `${OSS_URL}/img/spriteline.png`,
          },
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
              // 生成默认着色器
              czm_material material = czm_getDefaultMaterial(materialInput);
              // 获取st
              vec2 st = materialInput.st;
              // 根据uv采样颜色
              vec4 color = texture2D(image,vec2(fract(st.s + uTime),st.t));
              // 设置颜色透明度
              material.alpha = color.a;
              material.diffuse = color.rgb;

              return material;
            }
          `,
        },
      }
    );
    this.animation();
  }
  animation() {
    gsap.to(this.options, {
      uTime: 1,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  }
  getType() {
    // console.log('hello')
    return "SpriteLineMaterialProperty";
  }
  getValue(time: number, result: any) {
    result.uTime = this.options.uTime;
    return result;
  }

  equals(other: Cesium.Material) {
    return other instanceof SpriteLineMaterialProperty;
  }
}

export default SpriteLineMaterialProperty;
