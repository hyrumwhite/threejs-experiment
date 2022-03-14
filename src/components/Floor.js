import { Mesh, PlaneGeometry, MeshStandardMaterial } from "three";

export const Floor = {
  node: Mesh,
  params: [
    new PlaneGeometry(100, 100, 10, 10),
    new MeshStandardMaterial({
      color: 0xffffff,
    }),
  ],
  /**
   * @this {Mesh}
   */
  beforeAdd() {
    this.castShadow = false;
    this.receiveShadow = true;
    this.rotation.x = -Math.PI / 2;
  },
};
