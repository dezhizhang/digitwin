import { OSS_URL } from '@/constants';
import SpriteLineMaterialProperty from '@/material/SpriteLineMaterialProperty';
import * as Cesium from 'cesium';

// 道路飞线
class RoadLightLine {
  constructor(view: Cesium.Viewer, options?: { url: string }) {
    const { url } = options || {};
    const geojsonPromise = Cesium.GeoJsonDataSource.load(
      url ? url : `${OSS_URL}/json/roadline.geojson`,
    );

    geojsonPromise.then((datasource) => {
      view.dataSources.add(datasource);

      const entities = datasource.entities.values;
      const material = new SpriteLineMaterialProperty();
      entities.forEach((item) => {
        let polyline: any = item.polyline;
        polyline.material = material;
      });
    });
  }
}

export default RoadLightLine;
