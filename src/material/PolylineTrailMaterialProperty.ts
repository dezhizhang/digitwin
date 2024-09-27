import * as Cesium from "cesium";
import gsap from "gsap";

// 自定义飞线材质
class PolylineTrailMaterialProperty {
  definitionChanged: Cesium.Event;
  options: { uTime: number };
  constructor() {
    this.options = {
      uTime: 0,
    };
    this.definitionChanged = new Cesium.Event();

    (Cesium.Material as any)._materialCache.addMaterial(
      "PolylineTrailMaterialProperty",
      {
        fabric: {
          type: "PolylineTrailMaterialProperty",
          uniforms: {
            uTime: 0,
          },
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput) {
                // 默认的基础材质
                czm_material material = czm_getDefaultMaterial(materialInput);
                // 获取当前st
                vec2 st = materialInput.st;
                // 获取当前帧数,10秒内变化从0-1
                float time = fract(czm_frameNumber / (60.0 * 10.0));
                time = time * (1.0 + 0.1);
                // 平滑过渡函数
                float alpha = smoothstep(time - 0.1,time,st.s) * step(-time,-st.s);
                alpha += 0.05;

                material.alpha = alpha;
                material.diffuse = vec3(0.7,0.6,1.0);

                return material;
            }
          `,
        },
      }
    );
    this.animation();
  }

  animation() {
    gsap.to(this.options,{

    })
  }

  getType() {
    return "PolylineTrailMaterialProperty";
  }
  getValue(time: number, result: any) {
    return result;
  }
  equals(other: Cesium.Material) {
    return other instanceof PolylineTrailMaterialProperty;
  }
}

export default PolylineTrailMaterialProperty;
