import gsap from "gsap";
import * as Cesium from "cesium";
import { OSS_URL } from '@/constants';

class LightWallMaterialProperty {
  options: { uTime: number };
  definitionChanged: Cesium.Event;
  constructor() {
    this.options = {
      uTime: 0,
    };

    this.definitionChanged = new Cesium.Event();

    (Cesium.Material as any)._materialCache.addMaterial(
      "LightWallMaterialProperty",
      {
        fabric: {
          type: "LightWallMaterialProperty",
          uniforms: {
            uTime: 0,
            image: `${OSS_URL}/img/spriteline1.png`,
          },
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
                // 默认的基础材质
                czm_material material = czm_getDefaultMaterial(materialInput);
                  // 获取当前st
                vec2 st = materialInput.st;

                // 根据uv进行采样
                // vec4 color = texture2D(image,vec2(fract(st.y - uTime),st.x));
                vec4 color = texture2D(image, vec2(fract(st.y + uTime) , st.x ));
                material.diffuse = color.rgb;
                material.alpha = color.a;

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
      direction: 1,
      repeat: -1,
      ease: "linear",
    });
  }
  getType() {
    return "LightWallMaterialProperty";
  }
  getValue(time: number, result: any) {
    result.uTime = this.options.uTime;
    return result;
  }
  equals(other: Cesium.Material) {
    return other instanceof LightWallMaterialProperty;
  }
}

export default LightWallMaterialProperty;
