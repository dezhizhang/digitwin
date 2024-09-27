/*
 * :file description:
 * :name: /sungent/src/components/LocationMap/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-18 13:58:05
 * :last editor: 张德志
 * :date last edited: 2024-05-27 15:50:05
 */
import cx from 'classnames';
import * as THREE from 'three';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { SIDEBAR_WIDTH, OSS_URL, SUNGENT_IMAGE } from '@/constants';
import initScene from '@/web3d/scene';
// import { axesHelper } from '@/web3d/helper';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { fileLoader, textureLoader } from '@/web3d/loader';
import { ambientLight, directionalLight } from '@/web3d/light';
import { webGLRenderer, css3DRenderer } from '@/web3d/renderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { perspectiveCamera } from '@/web3d/camera';
import { createEffectComposer } from '@/web3d/effect';
import { destroyThreeInstance } from '@/web3d/utils';
import { createMapBgTexture } from '@/web3d/texture';
import CommonTilte from '@/components/CommonTilte';
import { MAP_CONFIG, EFFECT_CONFIG } from './constants';
import cardstyles from '@/styles/cardstyle.less';
import styles from './index.less';

const {
  MAP_SCALE,
  MESH_DEEPTH,
  CAMERA_ANGLE,
  MIN_DISTANCE,
  MAX_DISTANCE,
} = MAP_CONFIG;

export interface LocationMapProps {
  title: string;
  style?: CSSProperties;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = (props) => {
  const { className, style, title } = props;
  const locationMapRef = useRef(null);
  let scene: THREE.Scene;
  let controls: OrbitControls;
  let renderer: THREE.WebGLRenderer;
  let animationFrameId: number = 0;

  // 平行光位置
  const directVector3 = new THREE.Vector3(400, 200, 300);
  // 相机的位置
  const vector3 = new THREE.Vector3(-0.034, -0.04, 2);


  const initLight = () => {
    const group = new THREE.Group();
    // 添加环境光
    group.add(ambientLight());
    // 添加平行光
    const direct1 = directionalLight();
    direct1.position.copy(directVector3);
    group.add(direct1);

    const direct2 = directionalLight();
    direct2.position.set(-directVector3.x, -directVector3.y, -directVector3.z);
    group.add(direct2);

    return group;
  };

  /**
   * @description:初始化3d场景
   * @return {*}
   */
  const init3DMap = async () => {
    const container: any = locationMapRef.current;
    const width = SIDEBAR_WIDTH - 3;
    const height = Number(style?.height) - 3;

    // 灯光组
    const lightGroup = new THREE.Group();
    // 帮助组
    const helperGroup = new THREE.Group();
    // 面组
    const meshGroup = new THREE.Group();
    // 线组
    const lineGroup = new THREE.Group();
    // 标签组
    const tagsGroup = new THREE.Group();

    // 初始化场景
    scene = initScene();
    // 图片加载背景
    scene.background = textureLoader(SUNGENT_IMAGE.PARK_MAP_BG);
    // 初始化相机
    const camera = perspectiveCamera(CAMERA_ANGLE, width, height);
    camera.position.copy(vector3);
    camera.lookAt(vector3.x, vector3.y, 0);

    // 灯光
    lightGroup.add(initLight());


    const mapTexture = createMapBgTexture(SUNGENT_IMAGE.MAP);

    mapTexture.wrapS = mapTexture.wrapT = THREE.RepeatWrapping;
    mapTexture.repeat.set(1, 1);
    mapTexture.offset.set(0.3, 0.3);
    mapTexture.center.set(0.3, 0.6);
    mapTexture.rotation = 0.6;

    const geometries: THREE.ExtrudeGeometry[] = [];
    // 加载区域地图数据
    const jsonData: any = await fileLoader(`${OSS_URL}/json/suzhoupark.json`);
    jsonData.features.forEach((feature: any) => {
      if (
        feature.geometry.type === 'Polygon' ||
        feature.geometry.type === 'MultiPolygon'
      ) {
        const coordinates = feature.geometry.coordinates;

        coordinates.forEach((polygon: any) => {
          const shape = new THREE.Shape();
          polygon[0].forEach((coord: any, index: any) => {
            const x = coord[0];
            const y = coord[1];
            if (index === 0) {
              shape.moveTo(x, y);
            } else {
              shape.lineTo(x, y);
            }
          });
          const extrudeSettings = {
            depth: MESH_DEEPTH,
            bevelEnabled: false,
          };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          geometries.push(geometry);
        });
      }
    });

    const mergedGeometry = mergeGeometries(geometries);
    const material = new THREE.MeshLambertMaterial({
      map: mapTexture,
    });
    const mapMesh = new THREE.Mesh(mergedGeometry, material);
    const box = new THREE.Box3().setFromObject(mapMesh);
    const center = box.getCenter(new THREE.Vector3());

    mapMesh.position.sub(center);

    mapMesh.scale.set(MAP_SCALE, MAP_SCALE, MAP_SCALE);
    mapMesh.position.add(center.multiplyScalar(1 - MAP_SCALE));
    meshGroup.add(mapMesh);
  

    // 创建渲染器
    const renderer = webGLRenderer(width, height);
    container.appendChild(renderer.domElement);

    // 标签渲染器
    const labelRenderer = css3DRenderer(width, height);
    container.appendChild(labelRenderer.domElement);

    // 添加后期处理
    const { bloomComposer, finalComposer } = createEffectComposer({
      scene,
      camera,
      renderer,
      ...EFFECT_CONFIG,
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(vector3.x, vector3.y, 0);
    controls.minDistance = MIN_DISTANCE;
    controls.maxDistance = MAX_DISTANCE;

    controls.update();

  
    scene.add(meshGroup, lightGroup, lineGroup, tagsGroup, helperGroup);

    function render() {
      bloomComposer.render();
      finalComposer.render();
      labelRenderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(render);
    }
    render();
  };

  useEffect(() => {
    init3DMap();

    return () => {
      // 销毁three实例
      destroyThreeInstance({
        scene,
        renderer,
        controls,
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={style}
      className={cx(className, cardstyles.wrapper, styles.container)}
    >
      <CommonTilte title={title} className={styles.title} />
      <div ref={locationMapRef} className={styles.scene} />
    </div>
  );
};

export default LocationMap;
