/*
 * :file description: 圆形扩散材质
 * :name: /sungent/src/pages/industry-park-development/material/CoilDiffusionMaterialProperty.ts
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 19:10:45
 * :last editor: 张德志
 * :date last edited: 2024-06-03 16:04:19
 */
import * as Cesium from 'cesium';

class CoilDiffusionMaterialProperty {
  name?: string;
  color?: Cesium.Color | string;
  speed?: number;
  definitionChanged: Cesium.Event;
  constructor(name: string, color?: string, speed?: number) {
    this.name = name;
    this.color = color;
    this.speed = speed;
    this.definitionChanged = new Cesium.Event();
    (Cesium.Material as any)?._materialCache.addMaterial(
      'CoilDiffusionMaterialProperty',
      {
        fabric: {
          type: 'CoilDiffusionMaterialProperty',
          uniforms: {
            color: new Cesium.Color(0.9, 0.1, 0.1, 0.5),
            time: 0,
            speed: 10,
          },
          source: `
                uniform vec4 color;
                uniform float speed;
                float circle(vec2 uv, float r, float blur) {
                    float d = length(uv) * 1.0; /* 2.0 */
                    float c = smoothstep(r+blur, r, d);
                    return c;
                }
                czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st - 0.5;
                    material.diffuse = 2.8 * color.rgb;
                    material.emission = vec3(0);
                    float t = fract(czm_frameNumber * (11000.0 - speed) / 5000000.0);
                    float s = 0.3;
                    float radius1 = smoothstep(.0, s, t) * 0.5;
                    float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
                    float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
                    float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;
                    float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
                    material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);
                    material.alpha *= color.a ;
                    return material;
                }
            `,
        },
       
      },
    );
  }
  getType() {
    return 'CoilDiffusionMaterialProperty';
  }
  getValue(_: number, result: any) {
    // result.color = this.color;
    // result.speed = this.speed;
    return result;
  }
  equals(other: { name: string }) {
    return (
      other instanceof CoilDiffusionMaterialProperty && this.name === other.name
    );
  }
}

export default CoilDiffusionMaterialProperty;
