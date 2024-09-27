

// 加载高德地图影像
import * as Cesium from 'cesium';
import { setOneimageryProvider,colorRgb } from '@/utils';
import {MAP_IMAGERY_LIST} from '@/constants';


class ImageryProvider {
  constructor(viewer: Cesium.Viewer) {
    const imageryLayers = viewer.imageryLayers
    MAP_IMAGERY_LIST.some((elem: any, index: number) => {
      if (index === 0) {
        return false
      }
      imageryLayers.addImageryProvider(setOneimageryProvider(elem))
    })
    // 设置具体的 ImageryLayer 参数
    MAP_IMAGERY_LIST.some((elem: any, index: number) => {
      const baseLayer:any = viewer.imageryLayers.get(index)
      // 设置 offset 偏移量
      const offset: Array<string> = elem.offset.split(',')
      if (offset.length === 2) {
        try {
          const oxy: Array<number> = [
            parseFloat(offset[0]),
            parseFloat(offset[1]),
          ]
          baseLayer._imageryProvider._tilingScheme._rectangleNortheastInMeters.x +=
            oxy[0]
          baseLayer._imageryProvider._tilingScheme._rectangleNortheastInMeters.y +=
            oxy[1]
        }
        catch (error) {
          console.log(error)
        }
      }
      if (elem.interfaceConfig) {
        Object.getOwnPropertyNames(elem.interfaceConfig).forEach(function(
          key
        ) {
          baseLayer[key] = elem.interfaceConfig[key]
        })
      }
      // 设置 滤镜效果
      baseLayer.invertColor = elem.invertswitch
      baseLayer.filterRGB = [255.0, 255.0, 255.0]
      if (elem.filterRGB !== '#000000' && elem.filterRGB !== '#ffffff') {
        baseLayer.filterRGB = colorRgb(elem.filterRGB)
      }
      // 更改cesium的着色器代码 关于滤镜和反色的 [在不更改cesium源文件的情况下]
      this.changeImageryProviderColors(viewer, baseLayer)
    })
  }
  changeImageryProviderColors(viewer: any, baseLayer: any) {
    // 更改底图的着色器 代码
    const baseFragmentShaderSource =
      viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
    for (let i = 0; i < baseFragmentShaderSource.length; i++) {
      const oneSource = baseFragmentShaderSource[i]
      // 格式必须一致 不能多有空格 且保持版本一致性
      const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
      let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
      if (baseLayer.invertColor) {
        strT += `
          color.r = 1.0 - color.r;
          color.g = 1.0 - color.g;
          color.b = 1.0 - color.b;
        `
        strT += `
        color.r = color.r * ${baseLayer.filterRGB[0]}.0/255.0;
        color.g = color.g * ${baseLayer.filterRGB[1]}.0/255.0;
        color.b = color.b * ${baseLayer.filterRGB[2]}.0/255.0;
        `
      }

      if (oneSource.indexOf(strS) !== -1) {
        baseFragmentShaderSource[i] = baseFragmentShaderSource[i].replace(
          strS,
          strT
        )
      }
    }
  }
}

export default ImageryProvider;
