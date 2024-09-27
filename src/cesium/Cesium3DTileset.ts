import * as Cesium from 'cesium';

// 添加3d建筑物
class Cesium3DTileset {
  constructor(viewer: Cesium.Viewer, options: { url: string }) {
    const tileset = new Cesium.Cesium3DTileset({
      url: options.url,
      maximumScreenSpaceError: 1,
    });
    tileset.readyPromise.then((tile) => {
      viewer.zoomTo(tile);
    });

    viewer.scene.primitives.add(tileset);
    tileset.tileVisible.addEventListener((tile) => {
      const { content } = tile || {};
      const { featuresLength } = content || {};

      for (let i = 0; i < featuresLength; i++) {
        const model = content.getFeature(i)?.content?._model;
        // 修改模型偏元着色器
        if (model?._rendererResources?.sourceShaders[1]) {
          model._rendererResources.sourceShaders[1] = `
                varying vec3 v_positionEC;
                void main() {
                  czm_materialInput materialInput;
                  // 获取模型位置信息
                  vec4 position = czm_inverseModelView * vec4(v_positionEC,1.0);
                  // 根据高度设置渐变的颜色
  
                  float strength = position.z / 100.0;
                  gl_FragColor = vec4(strength * 0.1,strength * 0.3,strength * 0.9,1.0);
  
                  // 动态光环
                  float time = fract(czm_frameNumber / (60.0 * 5.0));
  
                  time = abs(time - 0.5) * 2.0;
                  
                  float diff = abs(clamp(position.z / 500.0,0.0,1.0) - time);
                  diff = step(0.01,diff);
                  gl_FragColor.rgb += vec3(0.5) * (1.0 - diff);
                }
              `;
          // 片元着色器修改,要更新着色器
          model._shouldRegenerateShaders = true;
        }
      }
    });
  }
}

export default Cesium3DTileset;
