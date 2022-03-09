import { AmbientLight } from "three";

export const MainAmbientLight = () => {
  return { node: new AmbientLight(0x101010) };
};
