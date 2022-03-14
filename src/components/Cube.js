import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";

export const Cube = {
  node: Mesh,
  params: [
    new BoxGeometry(2, 2, 2),
    new MeshStandardMaterial({
      color: 0x808080,
    }),
  ],
  /**
   * @this {Mesh}
   */
  beforeAdd() {
    this.castShadow = true;
    this.receiveShadow = true;
  },
};
