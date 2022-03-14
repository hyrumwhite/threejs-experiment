import { MeshStandardMaterial } from "three";

import { Cube } from "./Cube.js";

export const Player = {
  ...Cube,
  params: [
    Cube.params[0],
    new MeshStandardMaterial({
      color: 0xffffff,
    }),
  ],
  node: Cube,
  /**
   * @this {Cube.node}
   */
  beforeAdd() {
    Cube.beforeAdd.call(this);
    this.position.set(0, 1, 0);
  },
};
