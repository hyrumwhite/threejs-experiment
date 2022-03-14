import { DirectionalLight } from "three";

export const MainLight = {
  node: DirectionalLight,
  params: [0xffffff, 1.0],
  /**
   * @this {DirectionalLight}
   */
  beforeAdd() {
    this.position.set(20, 100, 10);
    this.target.position.set(0, 0, 0);
    this.castShadow = true;
    this.shadow.bias = -0.001;
    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2048;
    this.shadow.camera.near = 0.5;
    this.shadow.camera.far = 500.0;
    this.shadow.camera.left = 100;
    this.shadow.camera.right = -100;
    this.shadow.camera.top = 100;
    this.shadow.camera.bottom = -100;
  },
};
