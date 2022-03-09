import { PerspectiveCamera } from "three";

export const Camera = (context) => {
  const fov = 75;
  const aspect = 1920 / 1080;
  const near = 1.0;
  const far = 1000.0;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(75, 20, 0);
  return {
    node: camera,
  };
};
