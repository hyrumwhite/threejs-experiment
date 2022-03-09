import "./css/main.scss";

import {
  WebGL1Renderer,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  CubeTextureLoader,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  BoxGeometry,
  PCFSoftShadowMap,
  Scene,
} from "three";
import { OrbitControls } from "./controls/OrbitControls.js";

const initialize = () => {
  const threejs = new WebGL1Renderer({
    antialias: true,
  });
  threejs.shadowMap.enabled = true;
  threejs.shadowMap.type = PCFSoftShadowMap;
  threejs.setPixelRatio(window.devicePixelRatio);
  threejs.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(threejs.domElement);

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      threejs.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  const fov = 75;
  const aspect = 1920 / 1080;
  const near = 1.0;
  const far = 1000.0;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(75, 20, 0);

  const scene = new Scene();

  let light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(20, 100, 10);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.left = 100;
  light.shadow.camera.right = -100;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  scene.add(light);

  light = new AmbientLight(0x101010);
  scene.add(light);

  const controls = new OrbitControls(camera, threejs.domElement);
  controls.target.set(0, 20, 0);
  controls.update();

  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "./resources/posx.jpg",
    "./resources/negx.jpg",
    "./resources/posy.jpg",
    "./resources/negy.jpg",
    "./resources/posz.jpg",
    "./resources/negz.jpg",
  ]);
  scene.background = texture;

  const plane = new Mesh(
    new PlaneGeometry(100, 100, 10, 10),
    new MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const box = new Mesh(
    new BoxGeometry(2, 2, 2),
    new MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  box.position.set(0, 1, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  for (let x = -8; x < 8; x++) {
    for (let y = -8; y < 8; y++) {
      const box = new Mesh(
        new BoxGeometry(2, 2, 2),
        new MeshStandardMaterial({
          color: 0x808080,
        })
      );
      box.position.set(
        Math.random() + x * 5,
        Math.random() * 4.0 + 2.0,
        Math.random() + y * 5
      );
      box.castShadow = true;
      box.receiveShadow = true;
      scene.add(box);
    }
  }

  const tick = () => {
    requestAnimationFrame(() => {
      threejs.render(scene, camera);
      tick();
    });
  };

  tick();
};

initialize();
