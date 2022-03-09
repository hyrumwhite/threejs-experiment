import { Scene, AmbientLight, CubeTextureLoader } from "three";
import { MainLight } from "./MainLight.js";
import { MainAmbientLight } from "./MainAmbientLight.js";
import { Floor } from "./Floor.js";
import { Player } from "./Player.js";

export const MainScene = () => {
  let mainScene = new Scene();
  mainScene.background = texture;
  return {
    node: mainScene,
    children: [MainLight, MainAmbientLight, Player, Floor],
    setup() {
      const loader = new CubeTextureLoader();
      const texture = loader.load([
        "./resources/posx.jpg",
        "./resources/negx.jpg",
        "./resources/posy.jpg",
        "./resources/negy.jpg",
        "./resources/posz.jpg",
        "./resources/negz.jpg",
      ]);
      this.node.background = texture;
    },
  };
};
