import { Scene, CubeTextureLoader } from "three";
import { MainLight } from "./MainLight.js";
import { MainAmbientLight } from "./MainAmbientLight.js";
import { Floor } from "./Floor.js";
import { Player } from "./Player.js";
import { Cube } from "./Cube.js";

export const MainScene = {
  node: Scene,
  children: [MainLight, MainAmbientLight, Player, Floor],
  /**
   * @this {Scene}
   */
  beforeAdd({ add }) {
    const loader = new CubeTextureLoader();
    const texture = loader.load([
      "./resources/posx.jpg",
      "./resources/negx.jpg",
      "./resources/posy.jpg",
      "./resources/negy.jpg",
      "./resources/posz.jpg",
      "./resources/negz.jpg",
    ]);
    this.background = texture;
  },
};
