import { BoxGeometry, MeshStandardMaterial } from "three";

export const Player = (context) => {
  const box = new Mesh(
    new BoxGeometry(2, 2, 2),
    new MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  box.position.set(0, 1, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  return {
    node: box,
  };
};
