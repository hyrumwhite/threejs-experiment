import { PerspectiveCamera } from "three";

export const Camera = {
  node: PerspectiveCamera,
  params() {
    const fov = 75;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    return [fov, aspect, near, far];
  },
  /**
   * @this {PerspectiveCamera}
   */
  beforeAdd() {
    this.position.set(75, 20, 0);
  },
};
