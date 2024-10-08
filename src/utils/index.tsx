import * as Cesium from 'cesium';

// 设置高德地图影像图层
export function setOneimageryProvider(MapImagery: any): any {
  if (MapImagery?.classConfig?.customTags) {
    MapImagery.classConfig.customTags = evil(
      '(' + MapImagery.classConfig.customTags + ')'
    )
  }

  return new (Cesium as any)[MapImagery.type](MapImagery.classConfig)
}

// 输入16进制颜色值 转 rgb 的数组值 255
export function colorRgb(inColor: string): Array<number> {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = inColor.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    const colorChange: Array<number> = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange
  }
  return []
}

// 输入16进制颜色值 转 rgb 的数组值 0.0 - 1.0
export function colorRgb1(inColor: string): Array<number> {
  const colorChange: Array<any> = colorRgb(inColor)
  colorChange.forEach((ele: any, index: number) => {
    colorChange[index] = (ele / 255.0).toFixed(2)
  })
  return colorChange
}

// 函数
export function evil(fn: string): any {
  const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
}