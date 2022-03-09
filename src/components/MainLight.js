import { DirectionalLight } from "three";

export const MainLight = function (context) {
  let mainLight = new DirectionalLight(0xffffff, 1.0);
  mainLight.position.set(20, 100, 10);
  mainLight.target.position.set(0, 0, 0);
  mainLight.castShadow = true;
  mainLight.shadow.bias = -0.001;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 500.0;
  mainLight.shadow.camera.left = 100;
  mainLight.shadow.camera.right = -100;
  mainLight.shadow.camera.top = 100;
  mainLight.shadow.camera.bottom = -100;
  return { node: mainLight };
};
