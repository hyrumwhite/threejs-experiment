import { Mesh } from "three";
export const Floor = (context) => {
  const plane = new Mesh(
    new PlaneGeometry(100, 100, 10, 10),
    new MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  return {
    node: plane,
  };
};
